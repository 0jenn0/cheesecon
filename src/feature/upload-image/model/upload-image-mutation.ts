import { useToast } from '@/shared/ui/feedback';
import { uploadImageToBucket } from '@/entity/image/api';
import { IMAGE_QUERY_KEY } from '@/entity/image/query/query-key';
import { queryClient } from '@/provider/QueryProvider';
import { useMutation } from '@tanstack/react-query';

export const useUploadImageToBucketMutation = () => {
  const { addToast } = useToast();

  return useMutation({
    mutationFn: (formData: FormData) => uploadImageToBucket(formData),
    retry: 0,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({
          queryKey: IMAGE_QUERY_KEY.all,
        });
        addToast({
          type: 'success',
          message: '이미지 업로드에 성공했어요.',
        });
      }
      if (!data.success) {
        addToast({
          type: 'error',
          message: data.error?.message ?? '이미지 업로드에 실패했어요.',
        });
      }
    },
    onError: () => {
      addToast({
        type: 'error',
        message: '이미지 업로드에 실패했어요.',
      });
    },
  });
};
