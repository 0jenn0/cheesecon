import { useInfiniteQuery } from '@tanstack/react-query';
import {
  GetEmoticonSetsWithRepresentativeImageResult,
  getEmoticonSetsWithRepresentativeImage,
} from '../api';
import { EmoticonSetInfinityParams } from '../type';
import { EMOTICON_SET_QUERY_KEY } from './query-key';

const LIMIT = 8;

export const useEmoticonSetInfinityQuery = (
  params?: EmoticonSetInfinityParams,
  options?: {
    initialData?: {
      pages: GetEmoticonSetsWithRepresentativeImageResult[];
      pageParams: number[];
    };
    onSuccess?: (data: GetEmoticonSetsWithRepresentativeImageResult) => void;
    onError?: (error: Error) => void;
  },
) => {
  return useInfiniteQuery({
    queryKey: EMOTICON_SET_QUERY_KEY.order(params?.orderBy || 'created_at', {
      offset: params?.offset || 0,
      limit: params?.limit || LIMIT,
    }),
    queryFn: () =>
      getEmoticonSetsWithRepresentativeImage({
        offset: params?.offset || 0,
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
    initialData: options?.initialData,
    initialPageParam: 0,
    ...options,
  });
};
