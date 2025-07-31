'use client';

import { Icon } from '@/shared/ui/display';
import { LoginButton } from '@/feature/login/ui';

export default function LoginPage() {
  return (
    <div className='padding-16 tablet:padding-24 flex h-full w-full flex-col items-center justify-center'>
      <div className='flex w-full flex-1 items-center justify-center'>
        <Icon
          name='logo'
          className='h-[200px] w-[200px] text-[var(--color-cheesecon-primary-400)]'
        />
      </div>

      <div className='flex w-full flex-col items-center gap-12'>
        <LoginButton provider='naver' onClick={() => {}} />
        <LoginButton provider='kakao' onClick={() => {}} />
        <LoginButton provider='google' onClick={() => {}} />
      </div>
    </div>
  );
}
