import { Button } from '@/shared/ui/input';
import { useRegisterMutation } from '@/entity/emoticon-set/query/emoticon-set-mutation';
import useEmoticonRegister from '../model/hook';

export function RegisterBottomBar() {
  const {
    createEmoticonSetForm,
    imageUrls,
    validateAll,
    validationErrors,
    isValid,
  } = useEmoticonRegister();

  const registerMutation = useRegisterMutation({ imageUrls });

  const handleRegister = () => {
    const isFormValid = validateAll();
    if (!isFormValid) {
      console.log('검증 오류:', validationErrors);
      alert('입력 정보를 확인해주세요.');
      return;
    }

    registerMutation.mutate(createEmoticonSetForm);
  };

  return (
    <div className='fixed right-0 bottom-0 left-0 flex items-center justify-end bg-white/60 px-24 py-16 backdrop-blur-lg'>
      <Button
        textClassName='text-body-lg font-semibold'
        className='padding-32'
        onClick={handleRegister}
        disabled={registerMutation.isPending || !isValid}
        isLoading={registerMutation.isPending}
      >
        등록하기
      </Button>
    </div>
  );
}
