import { unstable_cache } from 'next/cache';
import { CACHE_TAGS } from '@/shared/config/cach-tag';
import { createAnonServerClient } from '@/shared/lib/supabase/anon';
import { GetEmoticonSetsWithRepresentativeImageResult } from '../api/types';
import {
  EmoticonSetInfinityParams,
  EmoticonSetWithRepresentativeImage,
} from '../type';

export const getPopularEmoticonSetsCached = unstable_cache(
  fetchEmoticonSets,
  [CACHE_TAGS.popular],
  { revalidate: 60 * 60, tags: [CACHE_TAGS.popular] },
);

export const getNewEmoticonSetsCached = unstable_cache(
  fetchEmoticonSets,
  [CACHE_TAGS.new],
  { revalidate: 60 * 60, tags: [CACHE_TAGS.new] },
);

export async function fetchEmoticonSets({
  limit,
  offset,
  orderBy,
  order,
}: EmoticonSetInfinityParams): Promise<GetEmoticonSetsWithRepresentativeImageResult> {
  const supabase = createAnonServerClient();

  const fetchLimit = Math.max(limit * 2, 16);

  const {
    data: sets,
    error,
    count,
  } = await supabase
    .from('emoticon_sets')
    .select(
      `
      id, title, author_name, likes_count, comments_count, type, platform,
      emoticon_images ( id, image_url, blur_url, image_order, is_representative, webp_url )
    `,
      { count: 'exact' },
    )
    .eq('is_private', false)
    .or('is_private.is.null')
    .order(orderBy, { ascending: order === 'asc' })
    .range(offset, offset + fetchLimit - 1);

  if (error) throw error;

  const formatted = (sets ?? [])
    .map((s) => {
      if (!s.emoticon_images || s.emoticon_images.length === 0) return null;
      const rep =
        s.emoticon_images.find((i) => i.is_representative) ??
        s.emoticon_images.find((i) => !i.is_representative) ??
        s.emoticon_images[0];

      if (!rep) return null;

      return {
        id: s.id,
        title: s.title,
        author_name: s.author_name,
        likes_count: s.likes_count ?? 0,
        comments_count: s.comments_count ?? 0,
        type: s.type,
        platform: s.platform,
        representative_image: rep,
        is_liked: false,
      };
    })
    .filter(Boolean) as EmoticonSetWithRepresentativeImage[];

  // 원하는 limit만큼만 반환
  const limitedFormatted = formatted.slice(0, limit);

  const total = count ?? 0;
  return {
    success: true,
    data: {
      data: limitedFormatted,
      hasMore: offset + limit < total,
      total,
      currentPage: Math.floor(offset / limit) + 1,
      totalPages: Math.ceil(total / limit),
    },
  };
}
