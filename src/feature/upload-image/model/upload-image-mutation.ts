import { uploadImageToBucket } from '@/entity/image/api';
import { IMAGE_QUERY_KEY } from '@/entity/image/query/query-key';
import { queryClient } from '@/provider/QueryProvider';
import { useMutation } from '@tanstack/react-query';

export const useUploadImageToBucketMutation = () => {
  return useMutation({
    mutationFn: (formData: FormData) => uploadImageToBucket(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: IMAGE_QUERY_KEY.all,
      });
    },
    onError: (error) => {
      // TODO: 토스트로 에러처리
      console.error('Upload mutation error:', error);
    },
  });
};
