import { BaseApiRequest, BaseApiResponse } from '@/shared/types';
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
