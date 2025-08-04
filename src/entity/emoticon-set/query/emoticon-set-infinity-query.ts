import { useInfiniteQuery } from '@tanstack/react-query';
import { getEmoticonSets } from '../api';
import { EMOTICON_SET_QUERY_KEY } from './query-key';

const LIMIT = 8;

export interface EmoticonSetInfinityQueryParams {
  orderBy:
    | 'created_at'
    | 'updated_at'
    | 'views_count'
    | 'likes_count'
    | 'comments_count';
  order: 'asc' | 'desc';
  offset?: number;
  limit?: number;
}

export const useEmoticonSetInfinityQuery = (
  params?: EmoticonSetInfinityQueryParams,
) => {
  return useInfiniteQuery({
    queryKey: EMOTICON_SET_QUERY_KEY.order(params?.orderBy || 'created_at', {
      offset: params?.offset || 0,
      limit: params?.limit || LIMIT,
    }),
    queryFn: ({ pageParam = 0 }) =>
      getEmoticonSets({
        offset: pageParam,
        limit: params?.limit || LIMIT,
        param: {
          orderBy: params?.orderBy || 'created_at',
          order: params?.order || 'desc',
        },
      }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages.length : undefined;
    },
    initialPageParam: 0,
  });
};
