import { Skeleton } from '@/shared/ui/feedback';

export default function EmoticonImageItemSkeleton() {
  return (
    <div className='flex w-full flex-col gap-12'>
      <Skeleton className='aspect-square h-full min-h-[100px] w-full min-w-[100px]' />
      <div className='tablet:justify-end flex w-full justify-between gap-4'>
        <Skeleton className='height-16 width-24' />
        <Skeleton className='height-16 width-24' />
      </div>
    </div>
  );
}
