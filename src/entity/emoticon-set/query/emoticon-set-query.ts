import { useQuery } from '@tanstack/react-query';
import { checkSecretNumber, getEmoticonSetDetail } from '../api';
import { EMOTICON_SET_QUERY_KEY } from './query-key';

export const useEmoticonSetDetailQuery = (id: string) => {
  return useQuery({
    queryKey: EMOTICON_SET_QUERY_KEY.byId(id),
    queryFn: () => getEmoticonSetDetail(id),
  });
};

export const useCheckSecretNumberQuery = (id: string, password: string) => {
  return useQuery({
    queryKey: EMOTICON_SET_QUERY_KEY.checkSecretNumber(id, password),
    queryFn: () => checkSecretNumber(id, password),
  });
};
