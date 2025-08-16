import { SortOrder } from '@/shared/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import {
  GetEmoticonSetsWithRepresentativeImageResult,
  getEmoticonSetsWithRepresentativeImage,
  getLikedEmoticonSets,
} from '../api';
import { EmoticonSetOrderBy } from '../type';
import { EMOTICON_SET_QUERY_KEY } from './query-key';

const LIMIT = 8;

export interface EmoticonSetPaginationQueryParams {
  orderBy: EmoticonSetOrderBy;
  order: SortOrder;
  page?: number;
  limit?: number;
  userId?: string;
  title?: string;
  isLiked?: boolean;
  isPrivate?: boolean;
}

export const useEmoticonSetPaginationQuery = (
  params?: EmoticonSetPaginationQueryParams,
  options?: UseQueryOptions<GetEmoticonSetsWithRepresentativeImageResult>,
) => {
  const page = params?.page || 1;
  const limit = params?.limit || LIMIT;
  const offset = (page - 1) * limit;

  const apiFunction = params?.isLiked
    ? getLikedEmoticonSets
    : getEmoticonSetsWithRepresentativeImage;

  return useQuery({
    queryKey: EMOTICON_SET_QUERY_KEY.pagination(
      params?.orderBy || 'created_at',
      {
        page,
        limit,
        order: params?.order || 'desc',
        userId: params?.userId,
        title: params?.title,
        isLiked: params?.isLiked,
        isPrivate: params?.isPrivate,
      },
    ),
    queryFn: () =>
      apiFunction({
        offset,
        limit,
        param: {
          orderBy: params?.orderBy || 'created_at',
          order: params?.order || 'desc',
          userId: params?.userId,
          title: params?.title,
          isPrivate: params?.isPrivate,
        },
      }),
    ...options,
  });
};
