import { useQuery } from '@tanstack/react-query';
import { getEmoticonSet } from '../api';
import { EMOTICON_SET_QUERY_KEY } from './query-key';

export const useEmoticonSetQuery = (id: string) => {
  return useQuery({
    queryKey: EMOTICON_SET_QUERY_KEY.byId(id),
    queryFn: () => getEmoticonSet(id),
  });
};
