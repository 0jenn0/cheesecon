import { useQuery } from '@tanstack/react-query';
import { getComments } from '../api';
import { COMMENT_QUERY_KEY } from './query-key';
import { CommentInfiniteQueryParams } from './types';

export const useCommentListQuery = (params: CommentInfiniteQueryParams) => {
  const scope = params.image_id ? 'image' : 'set';

  const id = (params.image_id ?? params.set_id ?? '').trim();
  const limit = params.limit ?? 100;
  const offset = params.offset ?? 0;

  const enabled = id.length > 0;
  const key = COMMENT_QUERY_KEY.list({
    scope,
    id: enabled ? id : null,
    limit,
    offset,
  });

  return useQuery({
    queryKey: key,
    queryFn: async ({ signal }) => {
      const res = await getComments(
        {
          set_id: scope === 'set' ? id : undefined,
          image_id: scope === 'image' ? id : undefined,
          limit,
          offset,
        },
        signal,
      );

      return res.success ? res.data.data : [];
    },
    enabled,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
    retry: 0,
  });
};
