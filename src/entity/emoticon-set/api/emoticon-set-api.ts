'use server';

import { createServerSupabaseClient } from '@/shared/lib/supabase/server';
import { ImageUrlWithOrder } from '@/shared/types';
import { Tables } from '@/types/types_db';
import {
  EmoticonImageRequest,
  EmoticonSet,
  EmoticonSetDetail,
  EmoticonSetRequest,
} from '../type';
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
    .select('*,emoticons:emoticon_sets_id_fkey(id,image_url,image_order)', {
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

export async function getEmoticonSetDetail(
  id: string,
): Promise<EmoticonSetDetail> {
  const supabase = await createServerSupabaseClient();

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
    profile:profiles(*),
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

  const formattedData: EmoticonSetDetail = {
    ...data,
    comments: data.comments.map((comment) => ({
      ...comment,
      profile: comment.profile as unknown as Tables<'profiles'>,
    })),
    likes: data.likes[0]?.count ?? 0,
    views: data.views[0]?.count ?? 0,
  };

  return formattedData;
}
