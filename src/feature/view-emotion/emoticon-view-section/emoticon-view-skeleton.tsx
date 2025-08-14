import { Skeleton } from '@/shared/ui/feedback';

export default function EmoticonViewSkeleton() {
  return (
    <ul className='grid grid-cols-1 gap-x-24 gap-y-12 md:grid-cols-2'>
      {Array.from({ length: 8 }).map((_, index) => (
        <li className='flex flex-col gap-8' key={index}>
          <div className='flex gap-8'>
            <Skeleton className='width-24 height-24' />

            <div className='flex w-full gap-24'>
              <Skeleton className='tablet:w-[96px] tablet:h-[96px] h-[80px] w-[80px]' />

              <div className='flex flex-1 flex-col justify-center gap-24'>
                <Skeleton className='h-[20px] w-[80px]' />
                <div className='flex w-full justify-between'>
                  <Skeleton className='h-16 w-[60px]' />
                  <Skeleton className='h-16 w-[80px]' />
                </div>
              </div>
            </div>
          </div>

          <div className='border-ghost w-full border-b-[0.6px]' />
        </li>
      ))}
    </ul>
  );
}
