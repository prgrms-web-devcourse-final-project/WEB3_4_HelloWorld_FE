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
