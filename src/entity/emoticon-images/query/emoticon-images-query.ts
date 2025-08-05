import { useQuery } from '@tanstack/react-query';
import { getEmoticonImages } from '../api';

export function useEmoticonImagesQuery(setId: string) {
  return useQuery({
    queryKey: ['emoticon-images', setId],
    queryFn: () => getEmoticonImages(setId),
  });
}
