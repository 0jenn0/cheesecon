'use server';

import { getPopularSetsCached } from '@/entity/emoticon-set/model/popular-cache';
import { EmoticonSetInfinityParams } from '@/entity/emoticon-set/type';

export async function fetchPopularSets(params: EmoticonSetInfinityParams) {
  return getPopularSetsCached(params);
}
