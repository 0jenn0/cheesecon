import { useQuery } from '@tanstack/react-query';
import { getComments } from '../api';
import { COMMENT_QUERY_KEY } from './query-key';
import { CommentInfiniteQueryParams } from './types';

export const useCommentQuery = (params: CommentInfiniteQueryParams) => {
  return useQuery({
    queryKey: COMMENT_QUERY_KEY.list(params),
    queryFn: async () => {
      const data = await getComments({
        ...params,
        limit: params.limit,
        offset: params.offset,
      });

      if (data.success) {
        return data.data;
      }

      if (data.error) {
        throw new Error(data.error.message);
      }
    },
  });
};
