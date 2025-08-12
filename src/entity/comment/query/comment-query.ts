import { useQuery } from '@tanstack/react-query';
import { getComments } from '../api';
import { COMMENT_QUERY_KEY } from './query-key';
import { CommentInfiniteQueryParams } from './types';

export const useCommentQuery = (params: CommentInfiniteQueryParams) => {
  return useQuery({
    queryKey: COMMENT_QUERY_KEY.list(
      params.image_id ? 'image' : 'set',
      params.image_id ?? params.set_id ?? null,
      params.limit ?? 100,
      params.offset ?? 0,
    ),
    queryFn: async ({ signal }) => {
      const data = await getComments(
        {
          ...params,
          limit: params.limit,
          offset: params.offset,
        },
        signal,
      );

      if (data.success) {
        return data.data;
      }

      if (data.error) {
        throw new Error(data.error.message);
      }
    },
  });
};
