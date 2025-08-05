'use server';

import { createServerSupabaseClient } from '@/shared/lib/supabase/server';

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

// export async function getEmoticonImages(setId: string) {
//   const supabase = await createServerSupabaseClient();
//   const rawData = await supabase
//     .from('emoticon_images')
//     .select('*')
//     .eq('set_id', setId);

//   // 데이터 정리
//   return (
//     rawData.data?.map((item) => ({
//       ...item,
//       created_at: item.created_at
//         ? new Date(item.created_at).toISOString()
//         : null,
//       comments_count: item.comments_count ?? 0,
//     })) || []
//   );
// }

export async function getEmoticonImages(setId: string) {
  try {
    const supabase = await createServerSupabaseClient();

    const { data: allData, error: allError } = await supabase
      .from('emoticon_images')
      .select('*')
      .limit(5);

    const { data, error } = await supabase
      .from('emoticon_images')
      .select('*')
      .eq('set_id', setId)
      .order('image_order', { ascending: true });

    const { data: setExists, error: setError } = await supabase
      .from('emoticon_sets')
      .select('id, title')
      .eq('id', setId)
      .single();

    if (error) {
      console.error('Query error:', error);
      throw error;
    }

    return data || [];
  } catch (err) {
    console.error('getEmoticonImages 전체 에러:', err);
    throw err;
  }
}
