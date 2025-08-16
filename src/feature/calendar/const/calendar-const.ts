export const MONTH_NAMES = Array.from(
  { length: 12 },
  (_, i) => `${i + 1}월` as const,
);

export const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];

export const APPROVED_DATES = [
  new Date('2025-07-31'),
  new Date('2025-08-07'),
  new Date('2025-08-14'),
];
