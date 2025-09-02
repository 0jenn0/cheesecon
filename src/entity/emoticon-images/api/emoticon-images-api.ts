'use server';

import { createServerSupabaseClient } from '@/shared/lib/supabase/server';
import { ApiResult } from '@/shared/types';
import {
  GetEmoticonImageResult,
  GetRepresentativeImageBySetIdResult,
} from './type';

export interface CreateEmoticonImageProps {
  setId: string;
  imageUrl: string;
  imageOrder: number;
}

export interface UpdateEmoticonImageProps {
  imageId: string;
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

export async function updateEmoticonImage({
  imageId,
  imageUrl,
  imageOrder,
}: UpdateEmoticonImageProps) {
  const supabase = await createServerSupabaseClient();


  if (error) {
    throw error;
  }

  return data;
}

export async function getEmoticonImages(
  setId: string,
  limit?: number,
  offset?: number,
) {
  try {
    const supabase = await createServerSupabaseClient();

    let query = supabase
      .from('emoticon_images')
      .select(`*, likes(count)`)
      .eq('set_id', setId)
      .or('is_representative.eq.false,is_representative.is.null')
      .order('image_order', { ascending: true });

    if (limit && offset !== undefined) {
      query = query.range(offset, offset + limit - 1);
    }

    const { data, error } = await query;

    if (error) {
      return {
        success: false,
        error: {
          message: error.message,
          code: error.code,
        },
      };
    }

    return {
      success: true,
      data: data || [],
    };
  } catch {
    return {
      success: false,
      error: {
        message: '서버 오류가 발생했습니다.',
        code: 'INTERNAL_ERROR',
      },
    };
  }
}

export async function getEmoticonImage({
  setId,
  imageId,
}: {
  setId: string;
  imageId: string;
}): Promise<GetEmoticonImageResult> {
  try {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
      .from('emoticon_images')
      .select(`*, likes(count)`)
      .eq('set_id', setId)
      .eq('id', imageId)
      .single();

    if (error) {
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
  } catch {
    return {
      success: false,
      error: {
        message: '서버 오류가 발생했습니다.',
        code: 'INTERNAL_ERROR',
      },
    };
  }
}

export async function getRepresentativeImageBySetId(
  setId: string,
): Promise<GetRepresentativeImageBySetIdResult> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('emoticon_images')
    .select('id, image_url, blur_url, webp_url')
    .eq('set_id', setId)
    .eq('is_representative', true)
    .single();

  if (error) {
    return {
      success: false,
      error: { message: `대표 이모티콘 이미지 조회 에러: ${error.message}` },
    };
  }

  if (!data) {
    return {
      success: false,
      error: { message: '대표 이모티콘 이미지를 찾을 수 없습니다.' },
    };
  }

  return {
    success: true,
    data,
  };
}

const RADIUS = 3;

export async function getEmoticonImageNeighborIds({
  setId,
  imageId,
}: {
  setId: string;
  imageId: string;
}) {
  const supabase = await createServerSupabaseClient();

  const { data: center, error: error1 } = await supabase
    .from('emoticon_images')
    .select('id, image_order')
    .eq('set_id', setId)
    .eq('id', imageId)
    .single();

  if (error1 || !center) {
    return {
      success: false,
      error: { message: error1?.message ?? 'CENTER_NOT_FOUND' },
    };
  }

  const minOrder = center.image_order - RADIUS;
  const maxOrder = center.image_order + RADIUS;

  const { data: neighbors, error: error2 } = await supabase
    .from('emoticon_images')
    .select('id, image_order')
    .eq('set_id', setId)
    .gte('image_order', minOrder)
    .lte('image_order', maxOrder)
    .or('is_representative.eq.false,is_representative.is.null')
    .order('image_order', { ascending: true });

  if (error2 || !neighbors) {
    return {
      success: false,
      error: { message: error2?.message ?? 'NO_NEIGHBORS' },
    };
  }

  return {
    success: true,
    data: neighbors.map((n) => n.id),
  };
}

export async function getEmoticonImageIdsAndOrder(
  setId: string,
): Promise<ApiResult<{ id: string; image_order: number }[]>> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('emoticon_images')
    .select('id, image_order')
    .eq('set_id', setId)
    .or('is_representative.eq.false,is_representative.is.null')
    .order('image_order', { ascending: true });

  if (error) {
    return {
      success: false,
      error: { message: error.message },
    };
  }

  return {
    success: true,
    data: data.map((d) => ({ id: d.id, image_order: d.image_order })),
  };
}
