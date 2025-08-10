'use client';

import { useRouter } from 'next/navigation';
import { ComponentPropsWithRef } from 'react';
import { cn } from '@/shared/lib';
import { Avatar } from '@/shared/ui/display';
import { IconButton } from '@/shared/ui/input';
import { useGetProfile } from '@/entity/profile/query/profile-query';
import { useAuth } from '@/feature/auth/provider/auth-provider';

export default function UserProfile({
  className,
  ...props
}: ComponentPropsWithRef<'div'>) {
  const { user, isLoading, signOut } = useAuth();
  const { data } = useGetProfile();

  const profile = data?.success ? data.data : null;

  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  const handleSignIn = () => {
    router.push('/login');
  };

  const isLoggedIn = !isLoading && user !== null && user.email !== '';

  return (
    <div
      className={cn('tablet:flex hidden items-center gap-12', className)}
      {...props}
    >
      {isLoggedIn && (
        <div className='flex items-center gap-8'>
          <Avatar
            name={profile?.nickname ?? ''}
            profileType={profile?.avatar_url ? 'image' : 'letter'}
            size='sm'
            imageUrl={profile?.avatar_url ?? ''}
          />
          <span className='text-body-sm'>{profile?.nickname}</span>
        </div>
      )}
      <IconButton
        variant='secondary'
        styleVariant='transparent'
        icon={isLoggedIn ? 'log-out' : 'log-in'}
        onClick={isLoggedIn ? handleSignOut : handleSignIn}
        iconSize={20}
      />
    </div>
  );
}
