import { useInfiniteQuery } from '@tanstack/react-query';
import {
  GetEmoticonSetsWithRepresentativeImageResult,
  getEmoticonSetsWithRepresentativeImage,
} from '../api';
import { EmoticonSetInfinityParams } from '../type';
import { EMOTICON_SET_QUERY_KEY } from './query-key';

const LIMIT = 12;

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
    queryFn: ({ pageParam }) =>
      getEmoticonSetsWithRepresentativeImage({
        offset: pageParam,
        limit: params?.limit || LIMIT,
        param: {
          orderBy: params?.orderBy || 'created_at',
          order: params?.order || 'desc',
        },
      }),
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.success || !lastPage.data.hasMore) {
        return undefined;
      }

      const currentOffset =
        (params?.offset || 0) + pages.length * (params?.limit || LIMIT);
      return currentOffset;
    },
    initialData: options?.initialData,
    initialPageParam: 0,
    ...options,
  });
};
