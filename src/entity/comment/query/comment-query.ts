import { useQuery } from '@tanstack/react-query';
import { getComments } from '../api';
import { COMMENT_QUERY_KEY } from './query-key';
import { CommentQueryParams } from './types';

export const useCommentQuery = (params: CommentQueryParams) => {
  return useQuery({
    queryKey: COMMENT_QUERY_KEY.list(JSON.stringify(params)),
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
