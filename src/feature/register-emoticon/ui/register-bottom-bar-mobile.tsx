import { Button } from '@/shared/ui/input';
import { useRegisterMutation } from '@/entity/emoticon-set/query/emoticon-set-mutation';
import useEmoticonRegister from '../model/hook';

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
  const {
    emoticonSetWithRepresentativeImage,
    imageUrls,
    validateAll,
    isValid,
  } = useEmoticonRegister();
  const registerMutation = useRegisterMutation({ imageUrls });

  const handleRegister = () => {
    const isFormValid = validateAll();

    if (!isFormValid) {
      // TODO: 토스트 메시지로 오류 표시
      return;
    }

    registerMutation.mutate(emoticonSetWithRepresentativeImage);
  };

  return (
    <div className='padding-16 fixed right-0 bottom-0 left-0 flex gap-8 bg-white/60 backdrop-blur-lg'>
      {currentStep === STEP_COUNT - 1 && (
        <>
          <Button
            className='w-full'
            textClassName='text-body-lg font-semibold'
            variant='secondary'
            onClick={() => handleStepChange(INITIAL_STEP)}
          >
            이전
          </Button>
          <Button
            className='w-full'
            textClassName='text-body-lg font-semibold'
            onClick={handleRegister}
            isLoading={registerMutation.isPending}
            disabled={registerMutation.isPending || !isValid}
          >
            등록하기
          </Button>
        </>
      )}
      {currentStep !== STEP_COUNT - 1 && (
        <Button
          className='w-full'
          textClassName='text-body-lg font-semibold'
          onClick={() => handleStepChange(currentStep + 1)}
        >
          다음
        </Button>
      )}
    </div>
  );
}
