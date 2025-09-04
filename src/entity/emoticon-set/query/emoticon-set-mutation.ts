'use client';

import { useRouter } from 'next/navigation';
import { useToast } from '@/shared/ui/feedback';
import { EmoticonImageState } from '@/entity/emoticon-images/type/emoticon-image.type';
import { useMutation } from '@tanstack/react-query';
import {
  createEmoticonSet,
  deleteEmoticonSet,
  updateEmoticonSet,
} from '../api/emoticon-set-api';
import { CreateEmoticonSetForm, UpdateEmoticonSetForm } from '../api/types';

export function useRegisterMutation() {
  const router = useRouter();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: ({
      emoticonSet,
      imageUrls,
    }: {
      emoticonSet: CreateEmoticonSetForm;
      imageUrls: EmoticonImageState[];
    }) => createEmoticonSet({ emoticonSet, imageUrls }),
    onSuccess: (data) => {
      if (data.success) {
        router.push(`/main/new`);
        addToast({
          type: 'success',
          message: '이모티콘 등록이 완료되었어요',
        });
      } else {
        addToast({
          type: 'error',
          message: '이모티콘 등록에 실패했어요',
        });
      }
    },
    onError: (error) => {
      addToast({
        type: 'error',
        message: error.message,
      });
    },
  });
}

export function useUpdateMutation(id: string) {
  const router = useRouter();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: ({
      emoticonSet,
      imageUrls,
    }: {
      emoticonSet: UpdateEmoticonSetForm;
      imageUrls: EmoticonImageState[];
    }) => updateEmoticonSet({ emoticonSet, imageUrls }),
    onSuccess: (data) => {
      if (data.success) {
        router.push(`/emoticon/${id}`);
        addToast({
          type: 'success',
          message: '이모티콘 수정이 완료되었어요',
        });
      } else {
        addToast({
          type: 'error',
          message: '이모티콘 수정에 실패했어요',
        });
      }
    },
    onError: () => {
      addToast({
        type: 'error',
        message: '이모티콘 수정에 실패했어요',
      });
    },
  });
}

export function useDeleteMutation() {
  const { addToast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: (id: string) => deleteEmoticonSet(id),
    onSuccess: () => {
      router.push('/main/new');
      addToast({
        type: 'success',
        message: '이모티콘 세트 삭제에 성공했어요.',
      });
    },
    onError: () => {
      addToast({
        type: 'error',
        message: '이모티콘 세트 삭제에 실패했어요.',
      });
    },
  });
}
