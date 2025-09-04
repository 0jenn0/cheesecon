'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { Icon } from '@/shared/ui/display';
import { useToast } from '@/shared/ui/feedback';
import { useAuth } from '@/feature/auth/provider/auth-provider';
import { LoginButton } from '@/feature/auth/ui';
import { trackEvent } from '@/shared/lib/amplitude';

function LoginContent() {
  const { addToast } = useToast();
  const { signInWithProvider } = useAuth();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';

  useEffect(() => {
    trackEvent('page_view', { page: 'login' });
  }, []);

  const handleSignIn = async (provider: 'kakao' | 'google') => {
    try {
      trackEvent('login_attempt', { provider });
      await signInWithProvider(provider, redirectUrl);
      trackEvent('login_success', { provider });
    } catch (error) {
      trackEvent('login_error', { provider, error: error instanceof Error ? error.message : 'unknown' });
      addToast({
        type: 'error',
        message: `로그인에 실패했어요. ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
      });
    }
  };

  return (
    <div className='padding-16 tablet:padding-24 flex h-full w-full flex-col items-center justify-center'>
      <div className='flex w-full flex-1 items-center justify-center'>
        <Icon
          name='logo'
          className='h-[200px] w-[200px] text-[var(--color-cheesecon-primary-400)]'
        />
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
