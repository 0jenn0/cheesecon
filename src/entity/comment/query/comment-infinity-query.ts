import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getComments } from '../api';
import { GetCommentsResult } from '../api/types';
import { COMMENT_QUERY_KEY } from './query-key';
import { CommentInfiniteQueryParams } from './types';

export const useCommentQuery = (
  params: CommentInfiniteQueryParams,
  options?: Omit<
    UseQueryOptions<
      GetCommentsResult,
      Error,
      GetCommentsResult,
      readonly unknown[]
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  const scope: 'image' | 'set' = params.image_id ? 'image' : 'set';
  const id = params.image_id ?? params.set_id ?? null;
  const limit = params.limit ?? 100;
  const offset = params.offset ?? 0;

  const queryKey = COMMENT_QUERY_KEY.list(scope, id, limit, offset);

  return useQuery({
    queryKey,
    queryFn: () =>
      getComments({
        ...params,
        limit,
        offset,
      }),
    enabled: !!id,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
    retry: 0,
    ...options,
  });
};
