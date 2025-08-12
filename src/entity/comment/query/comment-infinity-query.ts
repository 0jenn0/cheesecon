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
  const key = Object.entries(params).reduce(
    (acc, [key, value]) => {
      if (value) {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, string | number | null>,
  );
  return useQuery({
    queryKey: COMMENT_QUERY_KEY.list(key),
    queryFn: () =>
      getComments({
        ...params,
        limit: params.limit || 100,
        offset: params.offset || 0,
      }),
    ...options,
  });
};
