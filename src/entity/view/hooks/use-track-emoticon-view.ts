import { useMutation } from '@tanstack/react-query';
import { trackEmoticonView } from '../api';

export const useTrackEmoticonView = () => {
  return useMutation({
    mutationFn: ({ setId, userId }: { setId: string; userId?: string }) =>
      trackEmoticonView(setId, userId),
  });
};
