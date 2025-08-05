import { Comment, CommentSortParams } from '../type';

export type CommentInfiniteQueryParams = CommentQueryParams & {
  pageParam?: number;
};

export type CommentMutationParams = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};
