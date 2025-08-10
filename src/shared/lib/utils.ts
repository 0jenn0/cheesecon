import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function getTimeAgo(date: string) {
  const now = new Date();
  const then = new Date(date);
  const diff = now.getTime() - then.getTime();
  const diffInMinutes = Math.floor(diff / (1000 * 60));
  const diffInHours = Math.floor(diff / (1000 * 60 * 60));
  const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (diffInDays > 30) {
    return then.toLocaleDateString();
  }

  if (diffInDays > 0) {
    return `${diffInDays}일 전`;
  }

  if (diffInHours > 0) {
    return `${diffInHours}시간 전`;
  }

  if (diffInMinutes > 0) {
    return `${diffInMinutes}분 전`;
  }

  return '방금 전';
}

export function formatDate(date: string) {
  if (!date || date.trim() === '') {
    return '';
  }

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return '';
  }

  const [year, month, day] = dateObj.toLocaleDateString().split('.');
  return `${year}년 ${month}월 ${day}일`;
}
