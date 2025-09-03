'use server';

import { revalidateTag } from 'next/cache';
import { CACHE_TAGS } from '@/shared/config/cach-tag';
import { createServerSupabaseClient } from '@/shared/lib/supabase/server';
import { ApiResult } from '@/shared/types';
import { updateEmoticonImage } from '@/entity/emoticon-images/api/emoticon-images-api';
import { EmoticonImageState } from '@/entity/emoticon-images/type/emoticon-image.type';
import {
  EmoticonImage,
  EmoticonImageRequest,
  EmoticonSet,
  EmoticonSetDetail,
} from '../type';
import {
  CreateEmoticonSetRequest,
  CreateEmoticonSetResult,
  GetEmoticonSetsRequest,
  GetEmoticonSetsWithRepresentativeImageResult,
  UpdateEmoticonSetRequest,
  UpdateEmoticonSetResult,
} from './types';

export async function createEmoticonSet({
  emoticonSet,
  imageUrls,
}: CreateEmoticonSetRequest): Promise<CreateEmoticonSetResult> {
  const supabase = await createServerSupabaseClient();
  const user = (await supabase.auth.getUser()).data.user;

  if (!user) {
    throw new Error('User를 찾을 수 없습니다.');
  }

  const emoticonSetId = crypto.randomUUID();

  const emoticonRequest = {
    ...emoticonSet,
    id: emoticonSetId,
    user_id: user.id,
  };

  const { data, error } = await supabase
    .from('emoticon_sets')
    .insert(emoticonRequest)
    .select()
    .single();

  if (error) {
    console.error('Emoticon set 생성 에러:', error);
    throw new Error(`이모티콘 세트 생성에 실패했습니다: ${error.message}`);
  }

  const { data: allEmoticonImages, error: emoticonImagesError } = await supabase
    .from('emoticon_images')
    .insert(
      imageUrls.map(
        (imageUrl): EmoticonImageRequest => ({
          set_id: emoticonSetId,
          image_url: imageUrl.image_url,
          image_order: imageUrl.image_order,
          blur_url: imageUrl.blur_url ?? null,
          webp_url: imageUrl.webp_url ?? null,
          mp4_url: imageUrl.mp4_url ?? null,
          poster_url: imageUrl.poster_url ?? null,
          webm_url: imageUrl.webm_url ?? null,
          is_representative: imageUrl.is_representative ?? false,
        }),
      ),
    )
    .select();

  if (emoticonImagesError) {
    console.error('Emoticon images 생성 에러:', emoticonImagesError);
    throw new Error(
      `이모티콘 이미지 생성에 실패했습니다: ${emoticonImagesError.message}`,
    );
  }

  const emoticonImagesData = allEmoticonImages.filter(
    (image) => !image.is_representative,
  );

  const representativeImageData = allEmoticonImages.find(
    (image) => image.is_representative,
  );

  revalidateTag(CACHE_TAGS.new);

  return {
    success: true,
    data: {
      emoticonSet: data,
      emoticonImages: emoticonImagesData,
      representativeImage: representativeImageData ?? emoticonImagesData[0],
    },
  };
}

export async function updateEmoticonSet({
  emoticonSet,
  imageUrls,
}: UpdateEmoticonSetRequest): Promise<UpdateEmoticonSetResult> {
  const supabase = await createServerSupabaseClient();

  const { data: existingImages } = await supabase
    .from('emoticon_images')
    .select('id, image_order')
    .eq('set_id', emoticonSet.id);

  const existingImageIds = new Set(existingImages?.map((img) => img.id) || []);
  const existingOrderMap = new Map(
    existingImages?.map((img) => [img.image_order, img.id]) || [],
  );

  const imagesToUpdate: EmoticonImageState[] = [];
  const imagesToInsert: EmoticonImageState[] = [];
  const ordersToDelete: number[] = [];

  imageUrls.forEach((image) => {
    if (existingImageIds.has(image.id)) {
      imagesToUpdate.push(image);
    } else if (existingOrderMap.has(image.image_order)) {
      ordersToDelete.push(image.image_order);
      imagesToInsert.push(image);
    } else {
      imagesToInsert.push(image);
    }
  });

  if (ordersToDelete.length > 0) {
    await supabase
      .from('emoticon_images')
      .delete()
      .eq('set_id', emoticonSet.id)
      .in('image_order', ordersToDelete);
  }

  const emoticonSetPromise = supabase
    .from('emoticon_sets')
    .update(emoticonSet)
    .eq('id', emoticonSet.id)
    .select()
    .single();

  const updatePromises = imagesToUpdate.map((image) =>
    updateEmoticonImage({
      imageId: image.id,
      imageUrl: image.image_url,
      imageOrder: image.image_order,
    }),
  );

  const insertPromises = imagesToInsert.map((image) =>
    supabase
      .from('emoticon_images')
      .insert({
        id: image.id,
        set_id: emoticonSet.id,
        image_url: image.image_url,
        image_order: image.image_order,
        blur_url: image.blur_url || null,
        webp_url: image.webp_url || null,
        mp4_url: image.mp4_url || null,
        poster_url: image.poster_url || null,
        webm_url: image.webm_url || null,
        is_representative: image.is_representative || false,
      })
      .select()
      .single(),
  );

  const [emoticonSetData, ...imageResults] = await Promise.all([
    emoticonSetPromise,
    ...updatePromises,
    ...insertPromises,
  ]);

  if (!emoticonSetData.data) {
    return {
      success: false,
      error: {
        message: '이모티콘 세트 업데이트에 실패했습니다.',
      },
    };
  }

  if (imageResults.some((result) => 'error' in result && result.error)) {
    return {
      success: false,
      error: {
        message: '이모티콘 이미지 업데이트에 실패했습니다.',
      },
    };
  }

  revalidateTag(CACHE_TAGS.emoticonSet);
  revalidateTag(CACHE_TAGS.new);

  return {
    success: true,
    data: emoticonSetData.data,
  };
}

export async function getEmoticonSetsWithRepresentativeImage({
  limit = 10,
  offset = 0,
  param = {
    orderBy: 'created_at' as const,
    order: 'desc' as const,
    userId: '',
    title: '',
    isPrivate: undefined,
  },
}: GetEmoticonSetsRequest): Promise<GetEmoticonSetsWithRepresentativeImageResult> {
  const supabase = await createServerSupabaseClient();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const currentUserId = user?.id;

    let query = supabase.from('emoticon_sets').select(
      `id,
   title,
   author_name,
   likes_count,
   comments_count,
   type,
   platform,
   is_private,
   emoticon_images(
    id,
    image_url,
    blur_url,
    image_order,
    is_representative,
    webp_url,
    mp4_url,
    webm_url,
    poster_url
   )`,
      { count: 'exact' },
    );

    if (param.userId) {
      query = query.eq('user_id', param.userId);
    }
    if (param.title) {
      query = query.ilike('title', `%${param.title}%`);
    }

    if (param.isPrivate === null || param.isPrivate === false) {
      query = query.or('is_private.eq.false,is_private.is.null');
    }

    if (param.isPrivate === true) {
      query = query.eq('is_private', true);
    }

    const orderColumn =
      param.orderBy === 'created_at'
        ? 'created_at'
        : param.orderBy === 'likes_count'
          ? 'likes_count'
          : param.orderBy === 'views_count'
            ? 'views_count'
            : 'created_at';

    query = query.order(orderColumn, {
      ascending: param.order === 'asc',
    });

    query = query.order('id', { ascending: param.order === 'asc' });

    const fetchLimit = Math.max(limit * 2, 16); // 최소 16개, 최대 limit * 2개
    query = query.range(offset, offset + fetchLimit - 1);

    const { data: sets, error, count } = await query;

    if (error) {
      console.error('Query error:', error);
      throw new Error(`이모티콘 세트 조회에 실패했습니다: ${error.message}`);
    }

    if (sets && sets.length > 0) {
      const setIds = sets.map((s) => s.id);

      let likedSets: string[] = [];
      if (currentUserId) {
        const { data: likes } = await supabase
          .from('likes')
          .select('set_id')
          .in('set_id', setIds)
          .eq('user_id', currentUserId);

        likedSets =
          likes
            ?.map((l) => l.set_id)
            .filter((id): id is string => id !== null) || [];
      }

      const formattedSets = sets
        .map((set) => {
          if (!set.emoticon_images || set.emoticon_images.length === 0) {
            return null;
          }

          const representativeImage =
            set.emoticon_images.find((img) => img.is_representative === true) ||
            set.emoticon_images.filter(
              (img) => img.is_representative === false,
            )?.[0] ||
            set.emoticon_images[set.emoticon_images.length - 1];

          if (!representativeImage) {
            console.warn(
              `이모티콘 세트 ${set.id}에서 대표 이미지를 찾을 수 없습니다.`,
            );
            return null;
          }

          return {
            id: set.id,
            title: set.title,
            author_name: set.author_name,
            likes_count: set.likes_count || 0,
            comments_count: set.comments_count || 0,
            representative_image: {
              ...representativeImage,
              mp4_url: representativeImage.mp4_url || null,
              webm_url: representativeImage.webm_url || null,
              poster_url: representativeImage.poster_url || null,
            },
            is_liked: likedSets.includes(set.id),
            type: set.type,
            platform: set.platform,
          };
        })
        .filter((set): set is NonNullable<typeof set> => set !== null);

      const limitedFormattedSets = formattedSets.slice(0, limit);

      return {
        success: true,
        data: {
          data: limitedFormattedSets,
          hasMore: offset + limit < (count || 0),
          total: count || 0,
          currentPage: Math.floor(offset / limit) + 1,
          totalPages: Math.ceil((count || 0) / limit),
        },
      };
    }

    return {
      success: true,
      data: {
        data: [],
        hasMore: false,
        total: 0,
        currentPage: 1,
        totalPages: 0,
      },
    };
  } catch (error) {
    console.error('getEmoticonSets error:', error);
    throw error;
  }
}

export async function getLikedEmoticonSets({
  limit = 10,
  offset = 0,
  param = {
    orderBy: 'created_at' as const,
    order: 'desc' as const,
    userId: '',
    title: '',
  },
}: GetEmoticonSetsRequest): Promise<GetEmoticonSetsWithRepresentativeImageResult> {
  const supabase = await createServerSupabaseClient();

  if (!param.userId) {
    return {
      success: true,
      data: {
        data: [],
        hasMore: false,
        total: 0,
        currentPage: 1,
        totalPages: 0,
      },
    };
  }

  try {
    const { data: likedSets } = await supabase
      .from('likes')
      .select('set_id')
      .eq('user_id', param.userId);

    if (!likedSets || likedSets.length === 0) {
      return {
        success: true,
        data: {
          data: [],
          hasMore: false,
          total: 0,
          currentPage: 1,
          totalPages: 0,
        },
      };
    }

    const setIds = likedSets.map((l) => l.set_id).filter((id) => id !== null);

    let query = supabase
      .from('emoticon_sets')
      .select(
        `
        id,
        title,
        author_name,
        likes_count,
        comments_count,
        type,
        platform,
        emoticon_images(
          id,
          image_url,
          blur_url,
          image_order,
          is_representative,
          webp_url,
          mp4_url,
          webm_url,
          poster_url
        )
      `,
        { count: 'exact' },
      )
      .in('id', setIds);

    if (param.title) {
      query = query.ilike('title', `%${param.title}%`);
    }

    query = query.order(param.orderBy, {
      ascending: param.order === 'asc',
    });

    const fetchLimit = Math.max(limit * 2, 16);
    query = query.range(offset, offset + fetchLimit - 1);

    const { data: sets, error, count } = await query;

    if (error) {
      console.error('Query error:', error);
      throw new Error(
        `좋아요한 이모티콘 세트 조회에 실패했습니다: ${error.message}`,
      );
    }

    if (sets && sets.length > 0) {
      const formattedSets = sets
        .map((set) => {
          if (!set.emoticon_images || set.emoticon_images.length === 0) {
            return null;
          }

          const representativeImage =
            set.emoticon_images.find((img) => img.is_representative === true) ||
            set.emoticon_images.filter(
              (img) => img.is_representative === false,
            )?.[0] ||
            set.emoticon_images[set.emoticon_images.length - 1];

          if (!representativeImage) {
            console.warn(
              `이모티콘 세트 ${set.id}에서 대표 이미지를 찾을 수 없습니다.`,
            );
            return null;
          }

          return {
            id: set.id,
            title: set.title,
            author_name: set.author_name,
            likes_count: set.likes_count || 0,
            comments_count: set.comments_count || 0,
            type: set.type,
            platform: set.platform,
            representative_image: {
              ...representativeImage,
              mp4_url: representativeImage.mp4_url || null,
              webm_url: representativeImage.webm_url || null,
              poster_url: representativeImage.poster_url || null,
            },
            is_liked: true,
          };
        })
        .filter((set): set is NonNullable<typeof set> => set !== null);

      const limitedFormattedSets = formattedSets.slice(0, limit);

      return {
        success: true,
        data: {
          data: limitedFormattedSets,
          hasMore: offset + limit < (count || 0),
          total: count || 0,
          currentPage: Math.floor(offset / limit) + 1,
          totalPages: Math.ceil((count || 0) / limit),
        },
      };
    }

    return {
      success: true,
      data: {
        data: [],
        hasMore: false,
        total: 0,
        currentPage: 1,
        totalPages: 0,
      },
    };
  } catch (error) {
    console.error('getLikedEmoticonSets error:', error);
    throw error;
  }
}

export async function getEmoticonSetDetail(
  id: string,
): Promise<EmoticonSetDetail> {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const currentUserId = user?.id;

  const { data, error } = await supabase
    .from('emoticon_sets')
    .select(
      `
      *,
      emoticon_images!emoticon_images_set_id_fkey(
        *,
        likes:likes(count),
        comments:comments(count)
      ),
      likes(count),
      views(count),
      comments(
        *,
        profile:profiles!comments_user_id_fkey(*),
        comment_reactions(*)
      )
      `,
    )
    .eq('id', id)
    .single();

  if (error) {
    console.error('Emoticon set 조회 에러:', error);
    throw new Error(`이모티콘 세트 조회에 실패했습니다: ${error.message}`);
  }

  if (!data) {
    throw new Error('이모티콘 세트를 찾을 수 없습니다.');
  }

  let isLiked = false;
  if (currentUserId) {
    const { data: likeData } = await supabase
      .from('likes')
      .select('id')
      .eq('user_id', currentUserId)
      .eq('set_id', id)
      .single();

    isLiked = !!likeData;
  }

  const representativeImage =
    (data.emoticon_images || []).find(
      (img: EmoticonImage) => img.is_representative,
    ) || data.emoticon_images?.[0];

  const parentCommentIds = (data.comments || [])
    .filter((comment) => comment.parent_comment_id)
    .map((comment) => comment.parent_comment_id)
    .filter((id): id is string => id !== null);

  let parentCommentsMap = new Map();

  if (parentCommentIds.length > 0) {
    const { data: parentComments } = await supabase
      .from('comments')
      .select('id, profile:profiles!comments_user_id_fkey(*)')
      .in('id', parentCommentIds);

    if (parentComments) {
      parentCommentsMap = new Map(parentComments.map((pc) => [pc.id, pc]));
    }
  }

  const formattedData: EmoticonSetDetail = {
    ...data,
    representative_image: representativeImage,
    emoticon_images: data.emoticon_images.filter(
      (image) => image.id !== representativeImage.id,
    ),
    is_liked: isLiked,
    comments: (data.comments || []).map((comment) => {
      const parentComment = comment.parent_comment_id
        ? parentCommentsMap.get(comment.parent_comment_id)
        : null;

      return {
        ...comment,
        profile: comment.profile || {
          id: '',
          nickname: '',
          avatar_url: null,
          provider: '',
          created_at: null,
          updated_at: null,
          description: '',
        },
        comment_reactions: comment.comment_reactions || [],
        parent: parentComment
          ? {
              id: parentComment.id,
              profile: parentComment.profile || {
                id: '',
                nickname: '',
                avatar_url: null,
                provider: '',
                created_at: null,
                updated_at: null,
              },
            }
          : undefined,
      };
    }),
    likes: data.likes?.[0]?.count ?? 0,
    views: data.views?.[0]?.count ?? 0,
    comments_count: data.comments.length,
  };

  return formattedData;
}

export async function getEmoticonSetIsPrivate(id: string): Promise<boolean> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('emoticon_sets')
    .select('is_private')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Emoticon set 조회 에러:', error);
    throw new Error(`이모티콘 세트 조회에 실패했습니다: ${error.message}`);
  }

  return data?.is_private ?? false;
}

export async function getEmoticonSetForLock(
  id: string,
): Promise<EmoticonSetDetail> {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const currentUserId = user?.id;

  const { data, error } = await supabase
    .from('emoticon_sets')
    .select(
      `
      *,
      emoticon_images!emoticon_images_set_id_fkey(
        *,
        likes:likes(count),
        comments:comments(count)
      ),
      likes(count),
      views(count),
      comments(
        *,
        profile:profiles!comments_user_id_fkey(*),
        comment_reactions(*)
      )
      `,
    )
    .eq('id', id)
    .single();

  if (error) {
    console.error('Emoticon set 조회 에러:', error);
    throw new Error(`이모티콘 세트 조회에 실패했습니다: ${error.message}`);
  }

  if (!data) {
    throw new Error('이모티콘 세트를 찾을 수 없습니다.');
  }

  let isLiked = false;
  if (currentUserId) {
    const { data: likeData } = await supabase
      .from('likes')
      .select('id')
      .eq('user_id', currentUserId)
      .eq('set_id', id)
      .single();

    isLiked = !!likeData;
  }

  const representativeImage =
    (data.emoticon_images || []).find(
      (img: EmoticonImage) => img.is_representative,
    ) || data.emoticon_images?.[0];

  const parentCommentIds = (data.comments || [])
    .filter((comment) => comment.parent_comment_id)
    .map((comment) => comment.parent_comment_id)
    .filter((id): id is string => id !== null);

  let parentCommentsMap = new Map();

  if (parentCommentIds.length > 0) {
    const { data: parentComments } = await supabase
      .from('comments')
      .select('id, profile:profiles!comments_user_id_fkey(*)')
      .in('id', parentCommentIds);

    if (parentComments) {
      parentCommentsMap = new Map(parentComments.map((pc) => [pc.id, pc]));
    }
  }

  const formattedData: EmoticonSetDetail = {
    ...data,
    representative_image: {
      ...representativeImage,
      image_url: representativeImage.blur_url || '',
      blur_url: null,
    },
    emoticon_images: (data.emoticon_images || []).map((image) => ({
      ...image,
      image_url: image.blur_url || '',
      blur_url: null,
      likes_count: image.likes?.[0]?.count ?? 0,
      comments_count: image.comments?.[0]?.count ?? 0,
    })),
    is_liked: isLiked,
    comments: (data.comments || []).map((comment) => {
      const parentComment = comment.parent_comment_id
        ? parentCommentsMap.get(comment.parent_comment_id)
        : null;

      return {
        ...comment,
        profile: comment.profile || {
          id: '',
          nickname: '',
          avatar_url: null,
          provider: '',
          created_at: null,
          updated_at: null,
          description: '',
        },
        comment_reactions: comment.comment_reactions || [],
        parent: parentComment
          ? {
              id: parentComment.id,
              profile: parentComment.profile || {
                id: '',
                nickname: '',
                avatar_url: null,
                provider: '',
                created_at: null,
                updated_at: null,
              },
            }
          : undefined,
      };
    }),
    likes: data.likes?.[0]?.count ?? 0,
    views: data.views?.[0]?.count ?? 0,
    comments_count: data.comments.length,
  };

  return formattedData;
}

export async function getAuthorId(id: string): Promise<ApiResult<string>> {
  const supabase = await createServerSupabaseClient();

  if (!id) {
    return {
      success: false,
      error: {
        message: 'id가 없어서 이모티콘 세트를 찾을 수 없습니다.',
      },
    };
  }

  const { data, error } = await supabase
    .from('emoticon_sets')
    .select('user_id')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Emoticon set 조회 에러:', error);
    throw new Error(`이모티콘 세트 조회에 실패했습니다: ${error.message}`);
  }

  return {
    success: true,
    data: data?.user_id ?? '',
  };
}

export async function getEmoticonSet(id: string): Promise<EmoticonSet> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('emoticon_sets')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Emoticon set 조회 에러:', error);
    throw new Error(`이모티콘 세트 조회에 실패했습니다: ${error.message}`);
  }

  if (!data) {
    throw new Error('이모티콘 세트를 찾을 수 없습니다.');
  }

  return data;
}

export async function getEmoticonSetIsLiked(id: string): Promise<boolean> {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const currentUserId = user?.id;

  if (!currentUserId) {
    return false;
  }

  const { data, error } = await supabase
    .from('likes')
    .select('id')
    .eq('user_id', currentUserId)
    .eq('set_id', id)
    .single();

  if (error) {
    return false;
  }

  return !!data;
}
