import { SortOrder } from '@/shared/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import {
  GetEmoticonSetsWithRepresentativeImageResult,
  getEmoticonSetsWithRepresentativeImage,
} from '../api';
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
    onSuccess?: (data: GetEmoticonSetsWithRepresentativeImageResult) => void;
    onError?: (error: Error) => void;
  },
) => {
  return useInfiniteQuery({
    queryKey: EMOTICON_SET_QUERY_KEY.order(params?.orderBy || 'created_at', {
      offset: params?.offset || 0,
      limit: params?.limit || LIMIT,
    }),
    queryFn: ({ pageParam = 0 }) =>
      getEmoticonSetsWithRepresentativeImage({
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
