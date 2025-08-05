import { Comment, CommentSortParams } from '../type';

export type CommentQueryParams = {
  sortParams?: CommentSortParams;
  set_id?: string;
  user_id?: string;
  parent_comment_id?: string | null;
  limit?: number;
  offset?: number;
};

export type CommentInfiniteQueryParams = CommentQueryParams & {
  pageParam?: number;
};

export type CommentMutationParams = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};
