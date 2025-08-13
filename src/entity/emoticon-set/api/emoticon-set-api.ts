'use server';

import { createServerSupabaseClient } from '@/shared/lib/supabase/server';
import { ApiResult } from '@/shared/types';
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { representative_image, ...rest } = emoticonSet;

  const emoticonRequest = {
    ...rest,
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

  const isRepresentativeInImageUrls = imageUrls.some(
    (imageUrl) =>
      imageUrl.imageUrl === emoticonSet.representative_image.image_url,
  );

  const allImageUrls = isRepresentativeInImageUrls
    ? imageUrls
    : [
        ...imageUrls,
        {
          imageUrl: emoticonSet.representative_image.image_url,
          imageOrder: emoticonSet.representative_image.image_order,
          blurUrl: emoticonSet.representative_image.blur_url,
          webpUrl: emoticonSet.representative_image.webp_url,
        },
      ];

  const { data: emoticonImages, error: emoticonImagesError } = await supabase
    .from('emoticon_images')
    .insert(
      allImageUrls.map(
        (imageUrl): EmoticonImageRequest => ({
          set_id: emoticonSetId,
          image_url: imageUrl.imageUrl,
          image_order: imageUrl.imageOrder,
          blur_url: imageUrl.blurUrl ?? null,
          webp_url: imageUrl.webpUrl ?? null,
          is_representative:
            imageUrl.imageUrl === emoticonSet.representative_image.image_url,
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

  const representativeImage =
    emoticonImages.find((img) => img.is_representative) ?? emoticonImages[0];

  return {
    success: true,
    data: {
      emoticonSet: data,
      emoticonImages: emoticonImages.filter(
        (img) => img.id !== representativeImage.id,
      ),
      representativeImage: representativeImage,
    },
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
   emoticon_images(
    id,
    image_url,
    blur_url,
    image_order,
    is_representative,
    webp_url
   )`,
      { count: 'exact' },
    );

    if (param.userId) {
      query = query.eq('user_id', param.userId);
    }
    if (param.title) {
      query = query.ilike('title', `%${param.title}%`);
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

    query = query.range(offset, offset + limit - 1);

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
            representative_image: representativeImage,
            is_liked: likedSets.includes(set.id),
            type: set.type,
            platform: set.platform,
          };
        })
        .filter((set): set is NonNullable<typeof set> => set !== null);

      return {
        success: true,
        data: {
          data: formattedSets,
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
          webp_url
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

    query = query.range(offset, offset + limit - 1);

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
            representative_image: representativeImage,
            is_liked: true,
          };
        })
        .filter((set): set is NonNullable<typeof set> => set !== null);

      return {
        success: true,
        data: {
          data: formattedSets,
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
