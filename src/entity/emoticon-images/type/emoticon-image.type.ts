import { Tables } from '@/types/types_db';

export type EmoticonImage = Tables<'emoticon_images'>;

export type EmoticonImageSimple = Pick<
  EmoticonImage,
  'id' | 'image_url' | 'blur_url' | 'webp_url'
>;
