import { BaseApiRequest, BaseApiResponse, SortOrder } from '@/shared/types';
import { EmoticonSet, EmoticonSetOrderBy } from '../type';

export type EmoticonSetQueryKey = {
  all: readonly ['emoticon-sets'];
  order: (
    order: EmoticonSetOrderBy,
    param?: Pick<BaseApiRequest, 'limit' | 'offset'>,
  ) => readonly [
    ...(readonly ['emoticon-sets']),
    string,
    number | undefined,
    number | undefined,
  ];
  pagination: (
    order: EmoticonSetOrderBy,
    param: {
      page: number;
      limit: number;
      order: SortOrder;
      userId?: string;
      title?: string;
      isLiked?: boolean;
      isPrivate?: boolean;
    },
  ) => readonly [
    ...(readonly ['emoticon-sets']),
    'pagination',
    string,
    number,
    number,
    string,
    string | undefined,
    string | undefined,
    boolean | undefined,
    boolean | undefined,
  ];
  byId: (id: string) => readonly ['emoticon-sets', string];
};

export type EmoticonSetQueryResult = BaseApiResponse<EmoticonSet>;

export type EmoticonSetQueryOptions = {
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
  refetchOnWindowFocus?: boolean;
  refetchOnMount?: boolean;
};
