import { BaseApiRequest } from '@/shared/types';
import { EmoticonSetQueryKey } from './types';

type PaginationParams = Pick<BaseApiRequest, 'limit' | 'offset'>;

export const EMOTICON_SET_QUERY_KEY: EmoticonSetQueryKey = {
  all: ['emoticon-sets'] as const,
  order: (order: string, param?: PaginationParams) =>
    [
      ...EMOTICON_SET_QUERY_KEY.all,
      order,
      param?.offset,
      param?.limit,
    ] as const,
};
