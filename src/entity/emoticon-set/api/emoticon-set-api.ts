'use server';

import { createServerSupabaseClient } from '@/shared/lib/supabase/server';
import { ImageUrlWithOrder } from '@/shared/types';
import { Tables } from '@/types/types_db';
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
  },
}: GetEmoticonSetsRequest): Promise<GetEmoticonSetsResult> {
  const supabase = await createServerSupabaseClient();

  const { data, error, count } = await supabase
    .from('emoticon_sets')
    .select('*,emoticon_images(id,image_url,image_order)', {
      count: 'exact',
    })
    .order(param.orderBy, { ascending: param.order === 'asc' })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Emoticon sets 조회 에러:', error);
    throw new Error(`이모티콘 세트 조회에 실패했습니다: ${error.message}`);
  }

  return {
    success: true,
    data: {
      data: data || [],
      hasMore: count ? offset + limit < count : false,
      total: count || 0,
      currentPage: Math.floor(offset / limit) + 1,
      totalPages: count ? Math.ceil(count / limit) : 0,
    },
  };
}
// 더 안전한 대안 방법 (두 단계 쿼리)
export async function getEmoticonSetDetail(
  id: string,
): Promise<EmoticonSetDetail> {
  const supabase = await createServerSupabaseClient();

  // 1. 메인 데이터 조회
  const { data, error } = await supabase
    .from('emoticon_sets')
    .select(
      `
  *,
  emoticon_images(*),
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

  // 2. 부모 댓글들의 작성자 정보 조회
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
    emoticon_images: data.emoticon_images || [],
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
  };

  return formattedData;
}
