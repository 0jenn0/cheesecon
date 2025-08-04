import { ImageQueryKey } from './types';

export const IMAGE_QUERY_KEY: ImageQueryKey = {
  all: ['images'] as const,
  url: (path: string) => [...IMAGE_QUERY_KEY.all, path] as const,
};
