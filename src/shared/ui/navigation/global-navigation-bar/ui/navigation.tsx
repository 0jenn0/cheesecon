import Link from 'next/link';
import { ComponentPropsWithRef } from 'react';
import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui/input';

interface NavigationProps extends ComponentPropsWithRef<'nav'> {}

export default function Navigation({ className, ...props }: NavigationProps) {
  return (
    <nav className={cn('flex gap-24', className)} {...props}>
      <Button
        textClassName='text-body-sm text-interactive-primary font-semibold'
        size='sm'
        as={Link}
        href='/' // TODO: 이모티콘 등록하기 페이지 주소 추가
      >
        이모티콘 등록하기
      </Button>
      <Button
        textClassName='text-body-sm text-interactive-primary font-semibold'
        variant='secondary'
        size='sm'
        as={Link}
        href='/' // TODO: 마이 페이지 주소 추가
      >
        마이 페이지
      </Button>
    </nav>
  );
}
