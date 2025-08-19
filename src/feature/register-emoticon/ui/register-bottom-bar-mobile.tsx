'use client';

import { useCallback } from 'react';
import { Button } from '@/shared/ui/input';
import { useRegisterMutation } from '@/entity/emoticon-set/query/emoticon-set-mutation';
import { useDraft } from '../model/draft-context';

const INITIAL_STEP = 0;

export function RegisterBottomBarMobile({
  currentStep,
  STEP_COUNT,
  handleStepChange,
}: {
  currentStep: number;
  STEP_COUNT: number;
  handleStepChange: (step: number) => void;
}) {
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
    [emoticonSetInfo, allImages, registerMutation],
  );

  return (
    <form
      className='fixed right-0 bottom-0 left-0 flex items-center justify-end bg-white/60 px-24 py-16 backdrop-blur-lg'
      onSubmit={handleRegister}
    >
      {currentStep === STEP_COUNT - 1 && (
        <>
          <Button
            className='w-full'
            type='button'
            textClassName='text-body-lg font-semibold'
            variant='secondary'
            onClick={() => handleStepChange(INITIAL_STEP)}
          >
            이전
          </Button>
          <Button
            type='submit'
            className='w-full'
            textClassName='text-body-lg font-semibold'
            disabled={!validateAll().success}
          >
            등록하기
          </Button>
        </>
      )}
      {currentStep !== STEP_COUNT - 1 && (
        <Button
          className='w-full'
          type='button'
          textClassName='text-body-lg font-semibold'
          onClick={() => handleStepChange(currentStep + 1)}
        >
          다음
        </Button>
      )}
    </form>
  );
}
