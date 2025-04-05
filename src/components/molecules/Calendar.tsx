'use client';

import { memo, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

import { useCalendarStore } from '@/stores/calendarStore';
import dayjs from '@/utils/dayjsSetup';
import { getToday } from '@/utils/dateUtils';

const Calendar = () => {
  const today = dayjs();
  const todayStr = getToday();
  const { scheduleList, setSchedulesByDate } = useCalendarStore();

  const [currentMonth, setCurrentMonth] = useState(today);

  const startOfMonth = currentMonth.startOf('month').day();
  const endDate = currentMonth.daysInMonth();

  const days = [];

  for (let i = 0; i < startOfMonth; i++) days.push(null);
  for (let i = 1; i <= endDate; i++) days.push(i);

  const handleClick = (day: number | null) => {
    if (!day) return;
    const date = currentMonth.date(day).format('YYYY-MM-DD');

    setSchedulesByDate(date);
  };

  const getDotColor = (day: number | null) => {
    if (!day) return '';
    const date = currentMonth.date(day).format('YYYY-MM-DD');
    const hasSchedule = scheduleList.some((s) => s.date === date);
    const isPastOrToday = dayjs(date).isSameOrBefore(todayStr);

    return hasSchedule ? 'bg-[#17c964]' : isPastOrToday ? 'bg-[#f31260]' : '';
  };

  return (
    <div style={{ width: 554, height: 408 }}>
      <div className="flex justify-center items-center gap-6 mb-4">
        <button
          onClick={() => setCurrentMonth((prev) => prev.subtract(1, 'month'))}
        >
          <ChevronLeftIcon className="w-5 h-5 text-mono_500 hover:text-mono_600" />
        </button>
        <div className="text-lg font-bold">
          {currentMonth.format('YYYY.MM')}
        </div>
        <button onClick={() => setCurrentMonth((prev) => prev.add(1, 'month'))}>
          <ChevronRightIcon className="w-5 h-5 text-mono_500 hover:text-mono_600" />
        </button>
      </div>

      <div className="grid grid-cols-7 text-center">
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <div key={day} className="text-sm font-medium">
            {day}
          </div>
        ))}
        {days.map((day, idx) => (
          <div
            key={idx}
            className="h-16 flex flex-col items-center justify-center"
          >
            {day ? (
              <button
                className="w-6 h-6 rounded-full flex items-center justify-center text-sm text-mono-500 hover:bg-gray-200 focus:outline-none"
                type="button"
                onClick={() => handleClick(day)}
              >
                {day}
              </button>
            ) : (
              <div className="w-6 h-6 text-transparent" />
            )}
            <div
              className={`w-1.5 h-1.5 rounded-full mt-1 ${getDotColor(day)}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Calendar);
