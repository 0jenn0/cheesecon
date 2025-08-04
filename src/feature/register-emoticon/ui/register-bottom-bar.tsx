import { Button } from '@/shared/ui/input';
import { useRegisterMutation } from '@/entity/emoticon-set/query/emoticon-set-mutation';
import { useAuth } from '@/feature/auth/provider/auth-provider';
import useEmoticonRegister from '../model/hook';

export function RegisterBottomBar() {
  const { emoticonSet, imageUrls, validateAll, isValid, validationErrors } =
    useEmoticonRegister();
  const { session } = useAuth();
  const registerMutation = useRegisterMutation({ imageUrls });

  const handleRegister = () => {
    console.log('현재 상태:', {
      emoticonSet,
      user_id: session?.user.id,
      imageUrls,
      isValid,
      validationErrors,
    });

    const isFormValid = validateAll();

    if (!isFormValid) {
      console.log('검증 오류:', validationErrors);
      // 여기서 사용자에게 오류 메시지를 표시할 수 있습니다
      alert('입력 정보를 확인해주세요.');
      return;
    }

    registerMutation.mutate(emoticonSet);
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
