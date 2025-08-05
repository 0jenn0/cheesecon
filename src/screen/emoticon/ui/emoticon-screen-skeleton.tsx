import { cn } from '@/shared/lib';
import { Skeleton } from '@/shared/ui/feedback';

export default function EmoticonScreenSkeleton() {
  return (
    <div className='padding-y-16 tablet:padding-y-24 tablet:gap-24 flex flex-col gap-16'>
      <section className='tablet:border-radius-2xl bg-primary padding-24 flex flex-col gap-24'>
        <div className='bg-primary flex w-full items-center gap-16'>
          <Skeleton className='border-radius-lg aspect-square h-[100px] w-[100px]' />
          <div className='flex flex-1 flex-col gap-8'>
            {/* Header */}
            <div className='flex w-full items-center justify-between'>
              <div className='flex flex-col gap-4'>
                <Skeleton className='tablet:h-[36px] h-[28px] w-[120px]' />
                <Skeleton className='h-[20px] w-[40px]' />
              </div>
              <Skeleton className='border-radius-2xl h-[36px] w-[56px]' />
            </div>

            <div className='border-ghost w-full border-t' />

            {/* Footer */}
            <div className='flex w-full items-center justify-between'>
              <Skeleton className='tablet:w-[175px] h-[24px] w-[118px]' />
              <div className='flex gap-8'>
                <Skeleton className='h-[36px] w-[36px]' />
                <Skeleton className='h-[36px] w-[36px]' />
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-8'>
          {Array.from({ length: 3 }).map((_, index) => (
            <div className='flex items-center gap-16'>
              <div className='w-[100px]flex-col flex min-w-[100px]'>
                <Skeleton className='h-[16px] w-[80]' />
              </div>
              <Skeleton
                className={cn(
                  index === 2
                    ? 'h-[40px] w-full'
                    : 'tablet:w-[160px] h-[36px] w-full',
                )}
              />
            </div>
          ))}
        </div>
      </section>

      <section className='tablet:border-radius-2xl bg-primary tablet:padding-24 padding-16 tablet:gap-24 flex flex-col gap-16'>
        <Skeleton className='tablet:h-[24px] h-[18px] w-[80]' />
        <div className='border-ghost w-full border-t' />
        <ul className='tablet:grid-cols-6 tablet:gap-x-[32px] grid grid-cols-4 gap-x-16 gap-y-16'>
          {Array.from({ length: 18 }).map((_, index) => (
            <li key={index} className='flex flex-col gap-8'>
              <Skeleton className='aspect-square w-full' />
              <div className='tablet:justify-end flex items-center justify-between gap-8'>
                <Skeleton className='h-[16px] w-[24px]' />
                <Skeleton className='h-[16px] w-[24px]' />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
