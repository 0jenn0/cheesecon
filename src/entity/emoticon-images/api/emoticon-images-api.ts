'use server';

import { createServerSupabaseClient } from '@/shared/lib/supabase/server';
import { GetEmoticonImageResult } from './type';

export interface CreateEmoticonImageProps {
  setId: string;
  imageUrl: string;
  imageOrder: number;
}

export async function createEmoticonImage({
  setId,
  imageUrl,
  imageOrder,
}: CreateEmoticonImageProps) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.from('emoticon_images').insert({
    set_id: setId,
    image_url: imageUrl,
    image_order: imageOrder,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function getEmoticonImageDetail(
  setId: string,
  imageId: string,
): Promise<GetEmoticonImageResult> {
  try {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
      .from('emoticon_images')
      .select(`*, likes(count)`)
      .eq('set_id', setId)
      .eq('id', imageId)
      .single();

    if (error) {
      console.error('Query error:', error);
      return {
        success: false,
        error: {
          message: error.message,
          code: error.code,
        },
      };
    }

    if (!data) {
      return {
        success: false,
        error: {
          message: '데이터를 찾을 수 없습니다.',
          code: 'NOT_FOUND',
        },
      };
    }

    return {
      success: true,
      data,
    };
  } catch (err) {
    console.error('getEmoticonImages 전체 에러:', err);
    return {
      success: false,
      error: {
        message: '서버 오류가 발생했습니다.',
        code: 'INTERNAL_ERROR',
      },
    };
  }
}
