import { useInfiniteQuery } from '@tanstack/react-query';
import { GetActiveUsersInfinityResult, getActiveUsers } from '../api';
import { PROFILE_QUERY_KEYS } from './query-key';
import { ActiveUsersInfinityQueryParams } from './types';

const LIMIT = 8;

export const useActiveUsersInfinityQuery = (
  params?: ActiveUsersInfinityQueryParams,
  options?: {
    initialData?: {
      pages: GetActiveUsersInfinityResult[];
      pageParams: number[];
    };
  },
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
    ...options,
  });
};
