'use client';

import { useRouter } from 'next/navigation';
import { ComponentPropsWithRef } from 'react';
import { cn } from '@/shared/lib';
import { Avatar } from '@/shared/ui/display';
import { IconButton } from '@/shared/ui/input';
import { useAuth } from '@/feature/auth/provider/auth-provider';

interface UserProfileProps extends ComponentPropsWithRef<'div'> {}

export default function UserProfile({ className, ...props }: UserProfileProps) {
  const { user, isLoading, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  const handleSignIn = () => {
    router.push('/login');
  };

  const isLoggedIn = !isLoading && user !== null && user.email !== '';
  const name = user?.name || user?.email;

  return (
    <div
      className={cn('tablet:flex hidden items-center gap-12', className)}
      {...props}
    >
      {isLoggedIn && (
        <div className='flex items-center gap-8'>
          <Avatar
            name={name ?? '뭐임'}
            profileType={user?.avatarUrl ? 'image' : 'letter'}
            size='sm'
            imageUrl={user?.avatarUrl ?? ''}
          />
          <span className='text-body-sm'>{name}</span>
        </div>
      )}
      <IconButton
        variant='secondary'
        styleVariant='transparent'
        icon={isLoggedIn ? 'log-out' : 'log-in'}
        onClick={isLoggedIn ? handleSignOut : handleSignIn}
      />
    </div>
  );
}
