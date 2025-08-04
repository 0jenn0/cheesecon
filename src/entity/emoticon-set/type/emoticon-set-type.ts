import { BaseSortParams } from '@/shared/types';
import { Tables } from '@/types/types_db';

export type EmoticonSet = Omit<
  Tables<'emoticon_sets'>,
  | 'id'
  | 'created_at'
  | 'updated_at'
  | 'user_id'
  | 'comments_count'
  | 'likes_count'
  | 'views_count'
>;

export type EmoticonImageUrlWithOrder = {
  imageUrl: string;
  imageOrder: number;
};

export type EmoticonSetRequest = Tables<'emoticon_sets'>;

export type EmoticonImage = Tables<'emoticon_images'>;

export type EmoticonImageRequest = {
  set_id: string;
  image_url: string;
  image_order: number;
};

export type EmoticonSetOrderBy =
  | 'created_at'
  | 'updated_at'
  | 'views_count'
  | 'likes_count'
  | 'comments_count';

export type EmoticonSetSortParams = BaseSortParams & {
  orderBy: EmoticonSetOrderBy;
};
