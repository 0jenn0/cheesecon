import { Button } from '@/shared/ui/input';
import { useMutation } from '@tanstack/react-query';
import {
  EmoticonSet,
  createEmoticonSet,
} from '../../../../action/emoticon-action';
import useEmoticonRegister from '../model/hook';

export function RegisterBottomBar() {
  const { emoticonSet, imageUrls } = useEmoticonRegister();
  console.log('imageUrls클라이언트', imageUrls);
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
    // 필수 필드 검증
    if (!emoticonSet.title || emoticonSet.title.trim() === '') {
      alert('이모티콘 이름을 입력해주세요.');
      return;
    }

    if (!emoticonSet.author_name || emoticonSet.author_name.trim() === '') {
      alert('이모티콘 작가명을 입력해주세요.');
      return;
    }

    if (!emoticonSet.platform || emoticonSet.platform === '') {
      alert('이모티콘 플랫폼을 선택해주세요.');
      return;
    }

    if (!emoticonSet.type || emoticonSet.type === '') {
      alert('이모티콘 유형을 선택해주세요.');
      return;
    }

    if (!emoticonSet.description || emoticonSet.description.trim() === '') {
      alert('이모티콘 설명을 입력해주세요.');
      return;
    }

    if (imageUrls.length === 0) {
      alert('이모티콘 이미지를 업로드해주세요.');
      return;
    }

    // EmoticonSet 타입에 맞게 변환
    console.log('emoticonSet', emoticonSet);
    const emoticonSetForServer: EmoticonSet = {
      author_name: emoticonSet.author_name,
      description: emoticonSet.description,
      is_private: emoticonSet.is_private,
      password_hash: emoticonSet.password_hash,
      platform: emoticonSet.platform,
      representative_image_url: emoticonSet.representative_image_url,
      title: emoticonSet.title,
      type: emoticonSet.type,
    };

    registerMutation.mutate(emoticonSetForServer);
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
