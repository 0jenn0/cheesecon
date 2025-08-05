import { Tables } from '@/types/types_db';

export type Comment = Tables<'comments'>;

export type CommentReaction = Tables<'comment_reactions'>;

export type CommentWithReactions = Comment & {
  reactions?: CommentReaction[];
};

export type CommentSortParams = {
  sortBy?: 'created_at' | 'updated_at';
  sortOrder?: 'asc' | 'desc';
};

export type CreateCommentParams = {
  content: string;
  image_id?: string | null;
  images?: string[] | null;
  parent_comment_id?: string | null;
  set_id?: string | null;
  user_id?: string | null;
};

export type UpdateCommentParams = {
  id: string;
  content?: string;
  images?: string[] | null;
  updated_at?: string | null;
};

export type DeleteCommentParams = {
  id: string;
};
