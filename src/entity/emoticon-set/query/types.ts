import { BaseApiRequest, BaseApiResponse } from '@/shared/types';
import { Tables } from '@/types/types_db';
import { EmoticonSetOrderBy } from '../type';

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
};

export type EmoticonSetQueryResult = BaseApiResponse<Tables<'emoticon_sets'>>;

export type EmoticonSetQueryOptions = {
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
  refetchOnWindowFocus?: boolean;
  refetchOnMount?: boolean;
};
