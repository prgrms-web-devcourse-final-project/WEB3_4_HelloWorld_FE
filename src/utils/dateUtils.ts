import dayjs from 'dayjs';
import { CalendarDate } from '@internationalized/date';
export const getToday = () => dayjs().format('YYYY-MM-DD');

export const getMonthMatrix = (year: number, month: number) => {
  const start = dayjs(`${year}-${month}-01`);
  const startDay = start.day();
  const daysInMonth = start.daysInMonth();

  const days = [];
  const prevBlank = startDay === 0 ? 6 : startDay - 1;

  for (let i = 0; i < prevBlank; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  return days;
};

export const getDayOfWeek = (year: number, month: number, day: number) => {
  const calendarDate = new CalendarDate(year, month, day);

  const jsDate = new Date(
    calendarDate.year,
    calendarDate.month - 1,
    calendarDate.day,
  );
  const dayOfWeek = jsDate.getDay(); // 0 (일요일) ~ 6 (토요일)

  return dayOfWeek;
};
export function getTimeAgo(dateTimeString: string): string {
  const now = new Date();
  const past = new Date(dateTimeString);
  const diffMs = now.getTime() - past.getTime();
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 60) return '방금 전';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}분 전`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}시간 전`;
  if (diffSec < 2592000) return `${Math.floor(diffSec / 86400)}일 전`;
  if (diffSec < 31104000) return `${Math.floor(diffSec / 2592000)}개월 전`;

  return `${Math.floor(diffSec / 31104000)}년 전`;
}
