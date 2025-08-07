import { SortOrder } from '@/shared/types';
import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { GetEmoticonSetsResult, getEmoticonSets } from '../api';
import { EmoticonSetOrderBy } from '../type';
import { EMOTICON_SET_QUERY_KEY } from './query-key';

const LIMIT = 8;

export interface EmoticonSetInfinityQueryParams {
  orderBy: EmoticonSetOrderBy;
  order: SortOrder;
  offset?: number;
  limit?: number;
}

export const useEmoticonSetInfinityQuery = (
  params?: EmoticonSetInfinityQueryParams,
  options?: {
    onSuccess?: (data: GetEmoticonSetsResult) => void;
    onError?: (error: Error) => void;
  },
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
      return lastPage.success && lastPage.data.hasMore
        ? pages.length * (params?.limit || LIMIT)
        : undefined;
    },
    initialPageParam: 0,
    ...options,
  });
};
