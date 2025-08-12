'use client';

import { ComponentPropsWithRef } from 'react';
import { cn } from '@/shared/lib';
import { Skeleton } from '@/shared/ui/feedback';

type EmoticonCommentSectionProps = ComponentPropsWithRef<'section'>;

export default function EmoticonCommentSection({
  className,
  ...props
}: EmoticonCommentSectionProps) {
  return (
    <section
      className={cn(
        'tablet:gap-24 flex h-full w-full flex-col gap-16',
        className,
      )}
      {...props}
    >
      <div className='flex flex-col gap-8'>
        <div className='border-ghost flex items-center justify-between'>
          <div className='padding-8 flex items-center gap-4'>
            <h1 className='font-semibold'>댓글</h1>
            <Skeleton className='h-[20px] w-[30px]' />
          </div>
        </div>
        <div className='border-ghost border-b' />
      </div>

      <div className='flex w-full flex-1 flex-col gap-24'>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className='flex gap-12'>
            <Skeleton className='border-radius-rounded h-[30px] w-[30px]' />
            <Skeleton className='h-[60px] flex-1' />
          </div>
        ))}
      </div>
    </section>
  );
}
