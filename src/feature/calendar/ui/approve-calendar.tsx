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

  // 요일 계산을 위한 함수
  const getDayOfWeek = (date: Date) => {
    const days = [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
    ];
    return days[date.getDay()];
  };

  // 최근 승인 날짜
  const latestApprovedDate = APPROVED_DATES[APPROVED_DATES.length - 1];
  const latestDate = new Date(latestApprovedDate);
  const dayOfWeek = getDayOfWeek(latestDate);
  const year = latestDate.getFullYear();

  return (
    <section
      className={cn(
        'padding-x-16 padding-y-12 tablet:padding-24 bg-primary tablet:border-radius-xl flex w-full items-center justify-between gap-24',
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
          <Icon name='kakao-logo' size={20} />
          <h2 className='text-body-md text-secondary font-semibold'>
            최근 승인 날짜
          </h2>
        </div>

        <div className='tablet:block border-ghost hidden h-px w-full border-b-[0.6px]' />
        <div className='tablet:hidden border-secondary height-32 block w-px border-r-[0.6px]' />
        <div className='tablet:items-center flex flex-1 flex-col items-center justify-center gap-2'>
          <div className='text-heading-2xl text-yellow-500'>{day}</div>
          <div className='text-body-md'>{dayOfWeek}</div>
          <div className='text-tertiary text-body-sm'>
            {year}.{month.toString().padStart(2, '0')}
          </div>
        </div>
      </div>
    </section>
  );
}
