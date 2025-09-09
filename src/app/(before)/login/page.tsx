'use client';

import { Metadata } from 'next';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useToast } from '@/shared/ui/feedback';
import { useAuth } from '@/feature/auth/provider/auth-provider';
import { LoginButton } from '@/feature/auth/ui';
import { useRive } from '@rive-app/react-webgl2';

const STATE_MACHINE_NAME = 'state_machine_1';

export const metadata: Metadata = {
  title: '치즈콘 | 로그인',
  description:
    '커뮤니티에서 가장 많은 사랑을 받고 있는 이모티콘들을 만나보세요. 좋아요와 피드백이 가장 많은 인기작들을 모았습니다.',
  keywords: [
    '인기 이모티콘',
    '좋아요 많은 이모티콘',
    '피드백',
    '커뮤니티 인기',
    '트렌딩',
  ],
  openGraph: {
    title: '치즈콘 | 로그인',
    description:
      '커뮤니티에서 가장 많은 사랑을 받고 있는 이모티콘들을 만나보세요. 좋아요와 피드백이 가장 많은 인기작들을 모았습니다.',
    url: 'https://cheesecon.kr/login',
  },
  alternates: {
    canonical: 'https://cheesecon.kr/login',
  },
};

function LoginContent() {
  const { addToast } = useToast();
  const { signInWithProvider } = useAuth();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';

  const { RiveComponent } = useRive({
    src: '/cheesecon-logo.riv',
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
  });

  const handleSignIn = async (provider: 'kakao' | 'google') => {
    try {
      await signInWithProvider(provider, redirectUrl);
    } catch (error) {
      addToast({
        type: 'error',
        message: `로그인에 실패했어요. ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
      });
    }
  };

  return (
    <div className='padding-16 tablet:padding-24 flex h-full w-full flex-col items-center justify-center'>
      <div className='flex h-full w-full flex-1 items-center justify-center'>
        <RiveComponent />
      </div>

      <div className='flex w-full flex-col items-center gap-12'>
        <LoginButton
          provider='kakaotalk'
          onClick={() => handleSignIn('kakao')}
        />
        <LoginButton provider='google' onClick={() => handleSignIn('google')} />
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <LoginContent />
    </Suspense>
  );
}
