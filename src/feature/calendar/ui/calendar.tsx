'use client';

import { ComponentPropsWithRef, useCallback, useMemo, useState } from 'react';
import { cn } from '@/shared/lib';
import { DAY_NAMES, MONTH_NAMES } from '../const';
import {
  calculateNewMonth,
  generateCalendarData,
} from '../model/generate-date';

export default function MiniCalendar({
  className,
  approvedDates,
  ...props
}: ComponentPropsWithRef<'div'> & {
  approvedDates?: Date[];
}) {
  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date();
    if (approvedDates && approvedDates.length > 0) {
      const latestApprovedDate = approvedDates[approvedDates.length - 1];
      return {
        month: latestApprovedDate.getMonth(),
        year: latestApprovedDate.getFullYear(),
      };
    }
    return { month: now.getMonth(), year: now.getFullYear() };
  });

  const calendarData = useMemo(() => {
    return generateCalendarData({
      month: currentDate.month,
      year: currentDate.year,
      approvedDates,
    });
  }, [currentDate.month, currentDate.year, approvedDates]);

  const handlePreviousMonth = useCallback(() => {
    setCurrentDate((prev) => {
      const { month, year } = calculateNewMonth(-1, prev.month, prev.year);
      return { month, year };
    });
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentDate((prev) => {
      const { month, year } = calculateNewMonth(1, prev.month, prev.year);
      return { month, year };
    });
  }, []);

  return (
    <div className={cn('w-[140px] flex-shrink-0', className)} {...props}>
      <div className='mb-2 flex items-center justify-between px-1'>
        <button
          onClick={handlePreviousMonth}
          className='text-secondary bg-bg-interactive-secondary padding-2 cursor-pointer text-xs transition-all duration-200 ease-in-out'
        >
          ‹
        </button>
        <div className='text-xs font-semibold text-[#2d3436]'>
          {MONTH_NAMES[currentDate.month]} {currentDate.year}
        </div>
        <button
          onClick={handleNextMonth}
          className='text-secondary bg-bg-interactive-secondary padding-2 cursor-pointer text-xs transition-all duration-200 ease-in-out'
        >
          ›
        </button>
      </div>

      <div className='grid grid-cols-7 gap-[1px]'>
        {DAY_NAMES.map((day) => (
          <div
            key={day}
            className='text-tertiary py-0.5 text-center text-xs font-medium'
          >
            {day}
          </div>
        ))}

        {calendarData.map((item, index) => (
          <div
            key={index}
            className={`border-radius-md flex aspect-square cursor-pointer items-center justify-center text-[10px] transition-all duration-200 ease-in-out ${
              item.isToday
                ? 'border-secondary border font-semibold'
                : item.isApproved
                  ? 'bg-emerald-50 font-semibold text-emerald-600'
                  : item.isCurrentMonth
                    ? 'text-secondary'
                    : 'text-teritiary'
            }`}
          >
            {item.day}
          </div>
        ))}
      </div>
    </div>
  );
}
