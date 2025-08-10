import { BaseApiRequest, SortOrder } from '@/shared/types';
import { EmoticonSetOrderBy } from '../type';
import { EmoticonSetQueryKey } from './types';

type PaginationParams = Pick<BaseApiRequest, 'limit' | 'offset'>;

type PageParams = {
  page: number;
  limit: number;
  order: SortOrder;
  userId?: string;
  title?: string;
  isLiked?: boolean;
};

export const EMOTICON_SET_QUERY_KEY: EmoticonSetQueryKey = {
  all: ['emoticon-sets'] as const,
  order: (order: EmoticonSetOrderBy, param?: PaginationParams) =>
    [
      ...EMOTICON_SET_QUERY_KEY.all,
      order,
      param?.offset,
      param?.limit,
    ] as const,
  pagination: (order: EmoticonSetOrderBy, param: PageParams) =>
    [
      ...EMOTICON_SET_QUERY_KEY.all,
      'pagination',
      order,
      param.page,
      param.limit,
      param.order,
      param.userId,
      param.title,
      param.isLiked,
    ] as const,
  byId: (id: string) => [...EMOTICON_SET_QUERY_KEY.all, id] as const,
};
