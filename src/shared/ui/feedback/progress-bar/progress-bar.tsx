import { ComponentPropsWithRef } from 'react';
import { cn } from '@/shared/lib/utils';

export interface ProgressBarProps extends ComponentPropsWithRef<'div'> {
  current: number;
  total: number;
}

export default function ProgressBar({
  current,
  total,
  className,
  ...props
}: ProgressBarProps) {
  const ratio = Math.min((current / total) * 100, 100);

  return (
    <div
      className={cn(
        'bg-cheesecon-secondary-100 height-4 flex w-full gap-0',
        className,
      )}
      {...props}
    >
      <div
        className='bg-cheesecon-primary-300 h-full'
        style={{ width: `${ratio}%` }}
      />
      <div className='bg-tertiary h-full flex-1' />
    </div>
  );
}
