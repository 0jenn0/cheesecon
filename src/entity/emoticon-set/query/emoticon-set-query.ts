import { useQuery } from '@tanstack/react-query';
import { getEmoticonSetDetail } from '../api';
import { EMOTICON_SET_QUERY_KEY } from './query-key';

export const useEmoticonSetDetailQuery = (id: string) => {
  return useQuery({
    queryKey: EMOTICON_SET_QUERY_KEY.byId(id),
    queryFn: () => getEmoticonSetDetail(id),
  });
};
