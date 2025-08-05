import { useQuery } from '@tanstack/react-query';
import { commentApi } from '../api';
import { COMMENT_QUERY_KEY } from './query-key';
import { CommentQueryParams } from './types';

export const useCommentQuery = (params: CommentQueryParams) => {
  return useQuery({
    queryKey: COMMENT_QUERY_KEY.list(JSON.stringify(params)),
    queryFn: () =>
      commentApi.getComments({
        ...params,
        limit: params.limit || 10,
        offset: params.offset || 0,
      }),
  });
};
