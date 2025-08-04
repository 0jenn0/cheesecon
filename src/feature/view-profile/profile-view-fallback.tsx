import { ComponentProps } from 'react';
import { cn } from '@/shared/lib/utils';
import { Icon } from '@/shared/ui/display';

export default function ProfileViewFallback() {
  return (
    <div className='flex gap-8'>
      <FallbackBlock className='width-24 height-24 bg-transparent' />

      <div className='flex gap-24'>
        <FallbackBlock className='tablet:w-[96px] tablet:h-[96px] flex h-[80px] w-[80px] items-center justify-center'>
          <Icon name='logo' className='text-black/10' size={40} />
        </FallbackBlock>

        <div className='flex flex-1 items-center'>
          <p className='text-body-sm font-regular text-tertiary'>
            아직 등록된 프로필이 없어요
          </p>
        </div>
      </div>
    </div>
  );
}

function FallbackBlock({ className, children }: ComponentProps<'div'>) {
  return (
    <div className={cn('border-radius-lg bg-gray-100', className)}>
      {children}
    </div>
  );
}
