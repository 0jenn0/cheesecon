import { useQuery } from '@tanstack/react-query';
import { createShareLinkAction } from './actions';

export function useShareLink(id: string, expireHours: number) {
  return useQuery({
    queryKey: ['share-link', id, expireHours],
    queryFn: () => createShareLinkAction(id, expireHours),
  });
}
