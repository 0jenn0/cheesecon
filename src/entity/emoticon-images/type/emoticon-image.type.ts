import { Tables } from '@/types/types_db';

export type EmoticonImage = Tables<'emoticon_images'>;

export type EmoticonImageSimple = Pick<
  EmoticonImage,
  'id' | 'image_url' | 'blur_url' | 'webp_url'
>;

export type EmoticonImageState = Pick<
  EmoticonImage,
  | 'id'
  | 'image_url'
  | 'blur_url'
  | 'webp_url'
  | 'image_order'
  | 'is_representative'
  | 'poster_url'
  | 'mp4_url'
  | 'webm_url'
>;
