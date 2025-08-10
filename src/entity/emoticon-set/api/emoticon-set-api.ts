'use server';

import { createServerSupabaseClient } from '@/shared/lib/supabase/server';
import { ImageUrlWithOrder } from '@/shared/types';
import { EmoticonImageRequest, EmoticonSet, EmoticonSetDetail } from '../type';
import {
  CreateEmoticonSetResult,
  GetEmoticonSetsRequest,
  GetEmoticonSetsResult,
} from './types';

export async function createEmoticonSet(
  emoticonSet: EmoticonSet,
  imageUrls: ImageUrlWithOrder[],
): Promise<CreateEmoticonSetResult> {
  const supabase = await createServerSupabaseClient();
  const user = (await supabase.auth.getUser()).data.user;

  if (!user) {
    throw new Error('User를 찾을 수 없습니다.');
  }

  const emoticonSetId = crypto.randomUUID();

  const emoticonRequest: EmoticonSet = {
    ...emoticonSet,
    id: emoticonSetId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user_id: user.id,
    comments_count: 0,
    likes_count: 0,
    views_count: 0,
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

  const { data: emoticonImages, error: emoticonImagesError } = await supabase
    .from('emoticon_images')
    .insert(
      imageUrls.map(
        (imageUrl): EmoticonImageRequest => ({
          set_id: emoticonSetId,
          image_url: imageUrl.imageUrl,
          image_order: imageUrl.imageOrder,
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

  return {
    success: true,
    data: {
      emoticonSet: data,
      emoticonImages: emoticonImages,
    },
  };
}

export async function getEmoticonSets({
  limit = 10,
  offset = 0,
  param = {
    orderBy: 'created_at' as const,
    order: 'desc' as const,
    userId: '',
    title: '',
  },
}: GetEmoticonSetsRequest): Promise<GetEmoticonSetsResult> {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const currentUserId = user?.id;

  const { data, error } = await supabase.rpc(
    'get_emoticon_sets_with_like_status',
    {
      p_limit: limit,
      p_offset: offset,
      p_order_by: param.orderBy,
      p_order_direction: param.order,
      p_user_id_filter: param.userId || undefined,
      p_title_filter: param.title || undefined,
      p_current_user_id: currentUserId || undefined,
    },
  );

  if (error) {
    console.error('Emoticon sets 조회 에러:', error);
    throw new Error(`이모티콘 세트 조회에 실패했습니다: ${error.message}`);
  }

  const result = data?.[0] || { sets: [], total_count: 0 };

  return {
    success: true,
    data: {
      data: (result.sets as EmoticonSet[]) || [],
      hasMore: offset + limit < (result.total_count || 0),
      total: result.total_count || 0,
      currentPage: Math.floor(offset / limit) + 1,
      totalPages: Math.ceil((result.total_count || 0) / limit),
    },
  };
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
}: GetEmoticonSetsRequest): Promise<GetEmoticonSetsResult> {
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

  const { data, error } = await supabase.rpc(
    'get_liked_emoticon_sets_optimized',
    {
      p_user_id: param.userId,
      p_limit: limit,
      p_offset: offset,
      p_order_by: param.orderBy,
      p_order_direction: param.order,
      p_title_filter: param.title || undefined,
    },
  );

  if (error) {
    console.error('Liked emoticon sets 조회 에러:', error);
    throw new Error(
      `좋아요한 이모티콘 세트 조회에 실패했습니다: ${error.message}`,
    );
  }

  const result = data?.[0] || { sets: [], total_count: 0 };

  return {
    success: true,
    data: {
      data: (result.sets as EmoticonSet[]) || [],
      hasMore: offset + limit < (result.total_count || 0),
      total: result.total_count || 0,
      currentPage: Math.floor(offset / limit) + 1,
      totalPages: Math.ceil((result.total_count || 0) / limit),
    },
  };
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
      emoticon_images(
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

  const emoticon_images = (data.emoticon_images || []).map((image) => ({
    ...image,
    likes_count: image.likes?.[0]?.count ?? 0,
    comments_count: image.comments?.[0]?.count ?? 0,
  }));

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
    emoticon_images,
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
