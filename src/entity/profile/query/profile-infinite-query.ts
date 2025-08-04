import { useInfiniteQuery } from '@tanstack/react-query';
import { getActiveUsers } from '../api';
import { PROFILE_QUERY_KEYS } from './query-key';

const LIMIT = 8;

export interface ActiveUsersInfinityQueryParams {
  offset?: number;
  limit?: number;
}

export const useActiveUsersInfinityQuery = (
  params?: ActiveUsersInfinityQueryParams,
) => {
  return useInfiniteQuery({
    queryKey: PROFILE_QUERY_KEYS.activeUsers(),
    queryFn: ({ pageParam = 0 }) =>
      getActiveUsers(params?.limit || LIMIT, pageParam),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.success && lastPage.data.hasMore
        ? pages.length * (params?.limit || LIMIT)
        : undefined;
    },
    initialPageParam: 0,
  });
};
