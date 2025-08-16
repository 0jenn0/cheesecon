export function getCurrentDate() {
  const now = new Date();
  const day = now.getDate();
  const dayOptions = { weekday: 'long' as const };
  const dayStr = now.toLocaleDateString('ko-KR', dayOptions);
  const monthYearStr = now.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
  });

  return {
    day,
    dayStr,
    monthYearStr,
  };
}

export function isSameDate(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function generateCalendarData({
  month,
  year,
  approvedDates,
}: {
  month: number;
  year: number;
  approvedDates?: Date[];
}) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const calendarData: Array<{
    day: number;
    isCurrentMonth: boolean;
    isToday: boolean;
    isApproved: boolean;
    date: Date;
  }> = [];

  const today = new Date();
  const isCurrentMonth =
    year === today.getFullYear() && month === today.getMonth();

  for (let i = firstDay - 1; i >= 0; i--) {
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const day = daysInPrevMonth - i;
    const date = new Date(prevYear, prevMonth, day);

    calendarData.push({
      day,
      isCurrentMonth: false,
      isToday: false,
      isApproved:
        approvedDates?.some((approvedDate) => isSameDate(approvedDate, date)) ??
        false,
      date,
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const isToday = isCurrentMonth && day === today.getDate();

    calendarData.push({
      day,
      isCurrentMonth: true,
      isToday,
      isApproved:
        approvedDates?.some((approvedDate) => isSameDate(approvedDate, date)) ??
        false,
      date,
    });
  }

  const totalCells = calendarData.length;
  const remainingCells = 42 - totalCells;

  for (let day = 1; day <= remainingCells; day++) {
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    const date = new Date(nextYear, nextMonth, day);

    calendarData.push({
      day,
      isCurrentMonth: false,
      isToday: false,
      isApproved:
        approvedDates?.some((approvedDate) => isSameDate(approvedDate, date)) ??
        false,
      date,
    });
  }

  return calendarData;
}

export function calculateNewMonth(
  direction: number,
  currentMonth: number,
  currentYear: number,
) {
  let newMonth = currentMonth + direction;
  let newYear = currentYear;

  if (newMonth > 11) {
    newMonth = 0;
    newYear++;
  } else if (newMonth < 0) {
    newMonth = 11;
    newYear--;
  }

  return { month: newMonth, year: newYear };
}

export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function formatDate(date: Date, options?: Intl.DateTimeFormatOptions) {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };

  return date.toLocaleDateString('ko-KR', defaultOptions);
}

export function generateDateRange(startDate: Date, endDate: Date): Date[] {
  const dates: Date[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

export function getMonthBoundaries(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  return {
    firstDay,
    lastDay,
    daysInMonth: lastDay.getDate(),
  };
}

export function getMonthDay({ date }: { date: Date }) {
  return {
    month: date.getMonth(),
    day: date.getDate(),
  };
}
