'use server';

import { createServerSupabaseClient } from '@/shared/lib/supabase/server';
import { Tables } from '@/types/types_db';

export type EmoticonSetRequest = Tables<'emoticon_sets'>;

export type EmoticonSet = Omit<
  EmoticonSetRequest,
  | 'id'
  | 'created_at'
  | 'updated_at'
  | 'user_id'
  | 'comments_count'
  | 'likes_count'
  | 'views_count'
>;

// 허용된 플랫폼과 타입 값들
const ALLOWED_PLATFORMS = ['kakao', 'line'] as const;
const ALLOWED_TYPES = ['static', 'emotion'] as const;

export async function createEmoticonSet(
  emoticonSet: EmoticonSet,
  imageUrls: { imageUrl: string; imageOrder: number }[],
) {
  console.log('imageUrls서버', imageUrls);

  const supabase = await createServerSupabaseClient();
  const user = (await supabase.auth.getUser()).data.user;

  if (!user) {
    throw new Error('User를 찾을 수 없습니다.');
  }

  const emoticonSetId = crypto.randomUUID();

  const emoticonRequest: EmoticonSetRequest = {
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
      imageUrls.map((imageUrl) => ({
        set_id: emoticonSetId,
        image_url: imageUrl.imageUrl,
        image_order: imageUrl.imageOrder,
      })),
    )
    .select();

  if (emoticonImagesError) {
    console.error('Emoticon images 생성 에러:', emoticonImagesError);
    throw new Error(
      `이모티콘 이미지 생성에 실패했습니다: ${emoticonImagesError.message}`,
    );
  }

  // 직렬화 가능한 형태로 반환
  return {
    success: true,
    emoticonSet: {
      id: data.id,
      title: data.title,
      author_name: data.author_name,
      description: data.description,
      platform: data.platform,
      type: data.type,
      representative_image_url: data.representative_image_url,
      is_private: data.is_private,
      password_hash: data.password_hash,
      created_at: data.created_at,
      updated_at: data.updated_at,
      user_id: data.user_id,
      comments_count: data.comments_count,
      likes_count: data.likes_count,
      views_count: data.views_count,
    },
    emoticonImages: emoticonImages,
  };
}
