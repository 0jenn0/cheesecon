'use client';

import { useCallback, useMemo } from 'react';
import { Button } from '@/shared/ui/input';
import { useRegisterMutation } from '@/entity/emoticon-set/query/emoticon-set-mutation';
import { useDraft } from '../model/draft-context';

export function RegisterBottomBar() {
  const registerMutation = useRegisterMutation();
  const emoticonSetInfo = useDraft((store) => store.meta);

  const getAllImages = useDraft((store) => store.getAllImages);
  const validateAll = useDraft((store) => store.validateAll);

  const allImages = getAllImages();

  const handleRegister = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      registerMutation.mutate({
        emoticonSet: emoticonSetInfo,
        imageUrls: allImages,
      });
    },
    [emoticonSetInfo, allImages],
  );

  return (
    <form
      className='fixed right-0 bottom-0 left-0 flex items-center justify-end bg-white/60 px-24 py-16 backdrop-blur-lg'
      onSubmit={handleRegister}
    >
      <Button
        textClassName='text-body-lg font-semibold'
        className='padding-32'
        type='submit'
        disabled={!validateAll().success}
      >
        등록하기
      </Button>
    </form>
  );
}
