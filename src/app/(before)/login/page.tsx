'use client';

import { Icon } from '@/shared/ui/display';
import { useAuth } from '@/feature/auth/provider/auth-provider';
import { LoginButton } from '@/feature/auth/ui';

export default function LoginPage() {
  const { signInWithProvider } = useAuth();

  return (
    <div className='padding-16 tablet:padding-24 flex h-full w-full flex-col items-center justify-center'>
      <div className='flex w-full flex-1 items-center justify-center'>
        <Icon
          name='logo'
          className='h-[200px] w-[200px] text-[var(--color-cheesecon-primary-400)]'
        />
      </div>

      <div className='flex w-full flex-col items-center gap-12'>
        {/* <LoginButton provider='naver' onClick={() => {}} /> */}
        <LoginButton
          provider='kakaotalk'
          onClick={() => signInWithProvider('kakao')}
        />
        <LoginButton
          provider='google'
          onClick={() => signInWithProvider('google')}
        />
      </div>
    </div>
  );
}
