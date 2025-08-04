import { BaseApiRequest } from '@/shared/types';

export type ImageQueryKey = {
  all: readonly ['images'];
  url: (path: string) => readonly [...(readonly ['images']), string];
};

export type ImageQueryOptions = {
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
  refetchOnWindowFocus?: boolean;
  refetchOnMount?: boolean;
};
