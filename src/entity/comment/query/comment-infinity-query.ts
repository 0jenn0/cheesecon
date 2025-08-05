import { useQuery } from '@tanstack/react-query';
import { getComments } from '../api';
import { COMMENT_QUERY_KEY } from './query-key';
import { CommentInfiniteQueryParams } from './types';

export const useCommentQuery = (params: CommentInfiniteQueryParams) => {
  return useQuery({
    queryKey: COMMENT_QUERY_KEY.list(JSON.stringify(params)),
    queryFn: () =>
      getComments({
        ...params,
        limit: params.limit || 100,
        offset: params.offset || 0,
      }),
  });
};
