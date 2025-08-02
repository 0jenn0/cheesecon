import { queryClient } from '@/provider/QueryProvider';
import { useMutation } from '@tanstack/react-query';
import createEmoticonImage from '../api';
import { emoticonImageQueryKey } from './query-key';

export const useCreateEmoticonImageMutation = () => {
  return useMutation({
    mutationFn: createEmoticonImage,
    onSuccess: (_, { setId }) => {
      queryClient.invalidateQueries({
        queryKey: emoticonImageQueryKey.bySetId(setId),
      });
    },
  });
};
