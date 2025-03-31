import dayjs from 'dayjs';

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
