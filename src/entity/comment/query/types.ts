import Error from 'next/error';

export type CommentMutationParams = {
  commentId?: string;
  emoticonSetId?: string;
  emoticonImageId?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export type CommentInfiniteQueryParams = {
  set_id?: string;
  image_id?: string;
  user_id?: string;
  parent_comment_id?: string | null;
  limit?: number;
  offset?: number;
};
