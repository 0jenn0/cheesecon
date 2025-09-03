'use client';

import { useParams } from 'next/navigation';
import { useCallback } from 'react';
import { Button } from '@/shared/ui/input';
import {
  useRegisterMutation,
  useUpdateMutation,
} from '@/entity/emoticon-set/query/emoticon-set-mutation';
import { useDraft } from '../model/draft-context';

interface RegisterBottomBarProps {
  action: 'create' | 'update';
}

export function RegisterBottomBar({ action }: RegisterBottomBarProps) {
  const { id } = useParams();
  const registerMutation = useRegisterMutation();
  const updateMutation = useUpdateMutation(id as string);

  const emoticonSetInfo = useDraft((store) => store.meta);

  const getAllImages = useDraft((store) => store.getAllImages);
  const validateAll = useDraft((store) => store.validateAll);

  const allImages = getAllImages();

  const handleForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (action === 'create') {
        registerMutation.mutate({
          emoticonSet: emoticonSetInfo,
          imageUrls: allImages,
        });
      } else {
        updateMutation.mutate({
          emoticonSet: {
            id: id as string,
            ...emoticonSetInfo,
          },
          imageUrls: allImages,
        });
      }
    },
    [emoticonSetInfo, allImages, registerMutation, updateMutation, action, id],
  );

  return (
    <form
      className='fixed right-0 bottom-0 left-0 flex items-center justify-end bg-white/60 px-24 py-16 backdrop-blur-lg'
      onSubmit={handleForm}
    >
      <Button
        textClassName='text-body-lg font-semibold'
        className='padding-32'
        type='submit'
        disabled={!validateAll().success}
      >
        {action === 'create' ? '등록하기' : '수정하기'}
      </Button>
    </form>
  );
}
