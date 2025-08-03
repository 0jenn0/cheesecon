import { Button } from '@/shared/ui/input';
import { useRegisterMutation } from '@/entity/emoticon-set';
import useEmoticonRegister from '../model/hook';

export function RegisterBottomBar() {
  const { emoticonSet, imageUrls } = useEmoticonRegister();
  const registerMutation = useRegisterMutation({ imageUrls });

  const handleRegister = () => {
    registerMutation.mutate(emoticonSet);
  };

  return (
    <div className='fixed right-0 bottom-0 left-0 flex items-center justify-end bg-white/60 px-24 py-16 backdrop-blur-lg'>
      <Button
        textClassName='text-body-lg font-semibold'
        className='padding-32'
        onClick={handleRegister}
        disabled={registerMutation.isPending}
        isLoading={registerMutation.isPending}
      >
        등록하기
      </Button>
    </div>
  );
}
