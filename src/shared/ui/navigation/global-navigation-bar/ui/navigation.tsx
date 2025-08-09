import Link from 'next/link';
import { ComponentPropsWithRef } from 'react';
import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui/input';

interface NavigationProps extends ComponentPropsWithRef<'nav'> {}

export default function Navigation({ className, ...props }: NavigationProps) {
  return (
    <nav className={cn('flex items-center gap-12', className)} {...props}>
      <Button
        textClassName='text-body-sm text-interactive-primary font-semibold'
        variant='secondary'
        styleVariant='transparent'
        size='sm'
        as={Link}
        href='/popular'
      >
        홈
      </Button>
      <div className='border-ghost h-24 w-1 border-r' />
      <Button
        textClassName='text-body-sm text-interactive-primary font-semibold'
        variant='secondary'
        styleVariant='transparent'
        size='sm'
        as={Link}
        href='/emoticon-register'
      >
        이모티콘 등록
      </Button>
      <div className='border-ghost h-24 w-1 border-r' />
      <Button
        textClassName='text-body-sm text-interactive-primary font-semibold'
        variant='secondary'
        styleVariant='transparent'
        size='sm'
        as={Link}
        href='/my'
      >
        마이 페이지
      </Button>
    </nav>
  );
}
