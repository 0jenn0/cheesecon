'use client';

import { useAuth } from '@/feature/auth/provider/auth-provider';
import { Logo, MenuButton, Navigation, UserProfile } from './ui';

export default function GlobalNavigationBar() {
  return (
    <header className='border-ghost bg-primary padding-y-12 relative flex w-full items-center justify-center border-b'>
      <div className='padding-x-16 flex w-full max-w-[1024px] items-center justify-between'>
        <Logo />
        <Navigation className='tablet:flex hidden' />

        <div>
          <MenuButton />
          <UserProfile />
        </div>
      </div>
    </header>
  );
}
