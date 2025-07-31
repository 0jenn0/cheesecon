import { ComponentPropsWithRef } from 'react';
import { cn } from '@/shared/lib';
import { Avatar } from '@/shared/ui/display';
import { IconButton } from '@/shared/ui/input';

interface UserProfileProps extends ComponentPropsWithRef<'div'> {
  isLoggedIn: boolean;
  name?: string;
}

export default function UserProfile({
  isLoggedIn,
  name,
  className,
  ...props
}: UserProfileProps) {
  return (
    <div className={cn('flex items-center gap-12', className)} {...props}>
      {isLoggedIn && (
        <div className='flex items-center gap-8'>
          <Avatar name={name!} profileType='letter' size='sm' />
          <span className='text-body-sm'>{name}</span>
        </div>
      )}
      <IconButton
        variant='secondary'
        styleVariant='transparent'
        icon={isLoggedIn ? 'log-out' : 'log-in'}
      />
    </div>
  );
}
