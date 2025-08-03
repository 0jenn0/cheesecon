import { Tables } from '@/types/types_db';

export type EmoticonSetRequest = Tables<'emoticon_sets'>;

export type EmoticonSet = Omit<
  EmoticonSetRequest,
  | 'id'
  | 'created_at'
  | 'updated_at'
  | 'user_id'
  | 'comments_count'
  | 'likes_count'
  | 'views_count'
>;
