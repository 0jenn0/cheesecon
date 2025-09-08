'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useToast } from '@/shared/ui/feedback';
import { useAuth } from '@/feature/auth/provider/auth-provider';
import { LoginButton } from '@/feature/auth/ui';
import { useRive } from '@rive-app/react-webgl2';

const STATE_MACHINE_NAME = 'state_machine_1';

function LoginContent() {
  const { addToast } = useToast();
  const { signInWithProvider } = useAuth();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';

  const { RiveComponent, rive } = useRive({
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
