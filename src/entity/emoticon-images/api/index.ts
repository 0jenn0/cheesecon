import { createServerSupabaseClient } from '@/shared/lib/supabase/server';

export default async function createEmoticonImage({
  setId,
  imageUrl,
  imageOrder,
}: {
  setId: string;
  imageUrl: string;
  imageOrder: number;
}) {
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
