'use client';

import { usePathname } from 'next/navigation';
import { ProgressBar } from '../../feedback';
import Tabs from '../tabs/tabs';
import { useProgressStore } from './model/progress-context';
import { Logo, MenuButton, Navigation, UserProfile } from './ui';

export default function GlobalNavigationBar() {
  const pathname = usePathname();
  const { isUploading, currentUploadCount, totalUploadCount } =
    useProgressStore();
  const isTabActive = pathname.startsWith('/main');

  return (
    <div className='relative w-full'>
      {isUploading && (
        <ProgressBar
          className='fixed left-0 z-50 w-full'
          current={currentUploadCount}
          total={totalUploadCount}
        />
      )}
      <div className='z-index-sticky sticky top-0 right-0 left-0 z-10'>
        <header className='border-ghost padding-y-8 flex w-full items-center justify-center border-b bg-white/60 backdrop-blur-lg'>
          <div className='padding-x-16 flex w-full max-w-[1024px] items-center justify-between'>
            <Logo />
            <Navigation className='tablet:flex hidden' />

            <div>
              <MenuButton />
              <UserProfile />
            </div>
          </div>
        </header>
        {isTabActive && (
          <div className='bg-primary w-full'>
            <Tabs
              items={[
                { label: '인기순', href: '/main/popular' },
                { label: '최신순', href: '/main/new' },
                { label: '활동순', href: '/main/activity' },
              ]}
            />
          </div>
        )}
      </div>
    </div>
  );
}
