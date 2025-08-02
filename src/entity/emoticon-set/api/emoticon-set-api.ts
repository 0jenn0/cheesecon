'use server';

import { createServerSupabaseClient } from '@/shared/lib/supabase/server';
import { EmoticonSet, EmoticonSetRequest } from '../type';

export async function createEmoticonSet(
  emoticonSet: EmoticonSet,
  imageUrls: { imageUrl: string; imageOrder: number }[],
) {
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

  return {
    success: true,
    emoticonSet: data,
    emoticonImages: emoticonImages,
  };
}
