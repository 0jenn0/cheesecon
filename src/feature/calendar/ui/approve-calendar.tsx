import { ComponentPropsWithRef } from 'react';
import { cn } from '@/shared/lib';
import { Icon } from '@/shared/ui/display';
import { APPROVED_DATES } from '../const/calendar-const';
import { getMonthDay } from '../model/generate-date';
import MiniCalendar from './calendar';

export default function ApproveCalendar({
  className,
  ...props
}: ComponentPropsWithRef<'section'>) {
  const { month, day } = getMonthDay({
    date: APPROVED_DATES[APPROVED_DATES.length - 1],
  });

  return (
    <section
      className={cn(
        'padding-16 tablet:padding-24 bg-primary tablet:border-radius-xl flex w-full items-center justify-between gap-24',
        className,
      )}
      {...props}
    >
      <MiniCalendar
        className='tablet:block hidden max-w-[160px] flex-1'
        approvedDates={APPROVED_DATES}
      />
      <div className='tablet:flex-col tablet:gap-8 flex h-full flex-1 flex-row items-center justify-between gap-24'>
        <div className='flex items-center gap-8'>
          <Icon name='kakao-logo' size={32} className='text-brand' />
          <h2 className='text-body-md font-semibold'>최근 승인 날짜</h2>
        </div>

        <div className='tablet:block border-ghost hidden h-px w-full border-b-[0.6px]' />
        <div className='tablet:hidden border-secondary height-32 block w-px border-r-[0.6px]' />
        <div className='flex flex-1 items-center justify-center font-semibold'>
          <span className='text-heading-md border-radius-xl padding-16 tablet:padding-24 tablet:text-left tablet:w-auto text-secondary bg-secondary w-full text-center font-semibold'>
            {month} / {day}
          </span>
        </div>
      </div>
    </section>
  );
}
