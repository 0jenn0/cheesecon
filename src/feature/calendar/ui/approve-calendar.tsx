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
  const { month, day } = getMonthDay({ date: APPROVED_DATES[0] });

  return (
    <section
      className={cn(
        'padding-24 bg-primary tablet:border-radius-xl flex w-full items-center justify-between gap-24',
        className,
      )}
      {...props}
    >
      <MiniCalendar
        className='max-w-[160px] flex-1'
        approvedDates={APPROVED_DATES}
      />
      <div className='flex h-full flex-1 flex-col items-center justify-between gap-8'>
        <div className='flex items-center gap-8'>
          <Icon name='kakao-logo' size={32} className='text-brand' />
          <h2 className='text-body-md font-semibold'>최근 승인 날짜</h2>
        </div>

        <div className='border-ghost h-px w-full border-b-[0.6px]' />
        <div className='flex flex-1 items-center font-semibold'>
          <span className='text-heading-md border-radius-xl bg-secondary text-secondary padding-24'>
            {month} / {day}
          </span>
        </div>
      </div>
    </section>
  );
}
