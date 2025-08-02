import { uploadImage } from '@/entity/image/api';
import { imageQueryKey } from '@/entity/image/query/query-key';
import { queryClient } from '@/provider/QueryProvider';
import { useMutation } from '@tanstack/react-query';

export const useUploadImageMutation = () => {
  return useMutation({
    mutationFn: uploadImage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: imageQueryKey.all,
      });
    },
    onError: (error) => {
      // TODO: 토스트로 에러처리
      console.error('Upload mutation error:', error);
    },
  });
};
