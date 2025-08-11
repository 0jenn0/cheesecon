'use client';

import { useSearchParams } from 'next/navigation';
import { Icon } from '@/shared/ui/display';
import { useAuth } from '@/feature/auth/provider/auth-provider';
import { LoginButton } from '@/feature/auth/ui';

export default function LoginPage() {
  const { signInWithProvider } = useAuth();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';

  const handleSignIn = async (provider: 'kakao' | 'google') => {
    try {
      await signInWithProvider(provider, redirectUrl);
    } catch (error) {
      console.error('로그인 실패:', error);
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
