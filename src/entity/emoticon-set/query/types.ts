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
  ];
  byId: (id: string) => readonly ['emoticon-sets', string];
  checkSecretNumber: (
    id: string,
    password: string,
  ) => readonly ['emoticon-sets', 'checkSecretNumber', string, string];
};

export type EmoticonSetQueryResult = BaseApiResponse<EmoticonSet>;

export type EmoticonSetQueryOptions = {
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
  refetchOnWindowFocus?: boolean;
  refetchOnMount?: boolean;
};
