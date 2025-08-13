import { unstable_cache } from 'next/cache';
import { CACHE_TAGS } from '@/shared/config/cach-tag';
import { createAnonServerClient } from '@/shared/lib/supabase/anon';
import { GetEmoticonSetsWithRepresentativeImageResult } from '../api/types';
import {
  EmoticonSetInfinityParams,
  EmoticonSetWithRepresentativeImage,
} from '../type';

export const getPopularSetsCached = unstable_cache(
  async ({
    limit,
    offset,
    orderBy,
    order,
  }: EmoticonSetInfinityParams): Promise<GetEmoticonSetsWithRepresentativeImageResult> => {
    const supabase = createAnonServerClient();

    const orderCol =
      orderBy === 'likes_count'
        ? 'likes_count'
        : orderBy === 'views_count'
          ? 'views_count'
          : 'created_at';

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
      .order(orderCol, { ascending: order === 'asc' })
      .range(offset, offset + limit - 1);

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

    const total = count ?? 0;
    return {
      success: true,
      data: {
        data: formatted,
        hasMore: offset + limit < total,
        total,
        currentPage: Math.floor(offset / limit) + 1,
        totalPages: Math.ceil(total / limit),
      },
    };
  },
  [CACHE_TAGS.popular],
  { revalidate: 60 * 60, tags: [CACHE_TAGS.popular] },
);
