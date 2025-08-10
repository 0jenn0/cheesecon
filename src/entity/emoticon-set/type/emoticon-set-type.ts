import { BaseSortParams } from '@/shared/types';
import { Tables } from '@/types/types_db';

export type EmoticonSet = Tables<'emoticon_sets'> & {
  is_liked?: boolean;
};

export type EmoticonSetDetail = Tables<'emoticon_sets'> & {
  emoticon_images: Tables<'emoticon_images'>[];
  likes: number;
  views: number;
  comments: (Tables<'comments'> & {
    profile: Tables<'profiles'>;
    comment_reactions: Tables<'comment_reactions'>[];
    parent?: {
      id: string;
      profile: Tables<'profiles'>;
    };
  })[];
  is_liked: boolean;
};

export type EmoticonSetRequest = Omit<
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
  userId?: string;
  title?: string;
};
