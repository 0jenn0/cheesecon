import { ImageUrlWithOrder } from '@/shared/types';
import { useMutation } from '@tanstack/react-query';
import { createEmoticonSet } from '../api/emoticon-set-api';
import { EmoticonSet, EmoticonSetWithRepresentativeImage } from '../type';

export interface RegisterMutationProps {
  imageUrls: ImageUrlWithOrder[];
}

export function useRegisterMutation({ imageUrls }: RegisterMutationProps) {
  return useMutation({
    mutationFn: (emoticonSet: EmoticonSetWithRepresentativeImage) =>
      createEmoticonSet(emoticonSet, imageUrls),
    onSuccess: (data) => {
      console.log('이모티콘 등록 성공:', data);
      // 성공 후 처리 (예: 페이지 이동, 토스트 메시지 등)
    },
    onError: (error) => {
      console.error('이모티콘 등록 실패:', error);
      // 에러 처리 (예: 에러 토스트 메시지 등)
    },
  });
}
