import { Button } from '@/shared/ui/input';
import { useMutation } from '@tanstack/react-query';
import {
  EmoticonSet,
  createEmoticonSet,
} from '../../../../action/emoticon-action';
import useEmoticonRegister from '../model/hook';

export function RegisterBottomBar() {
  const { emoticonSet, imageUrls } = useEmoticonRegister();

  const registerMutation = useMutation({
    mutationFn: (emoticonSet: EmoticonSet) =>
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
