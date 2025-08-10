import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../api';
import { PROFILE_QUERY_KEYS } from './query-key';

export function useGetProfile() {
  return useQuery({
    queryKey: PROFILE_QUERY_KEYS.me(),
    queryFn: getProfile,
  });
}
