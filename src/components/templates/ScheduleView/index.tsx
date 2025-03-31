'use client';

import { useCalendarStore } from '@/stores/calendarStore';
import dayjs from '@/utils/dayjsSetup';
import { memo } from 'react';
import ScrollContainerBox from '@/components/atoms/ScrollShadowBox';

const ScheduleView = () => {
  const { selectedSchedules } = useCalendarStore();

  return (
    <ScrollContainerBox>
      <div className="flex flex-col gap-6">
        {selectedSchedules.length > 0 ? (
          selectedSchedules.map((schedule, idx) => (
            <div key={`${schedule.date}-${idx}`}>
              <p className="text-xl font-bold mb-1">
                {dayjs(schedule.date).format('YYYY.MM.DD일 (dd)')}
              </p>
              <p className="bg-[#17c964] inline-block px-2 text-mono-100 rounded-sm text-xs mb-2">
                {schedule.tag}
              </p>
              <h3 className="font-bold text-base mb-2">{schedule.title}</h3>
              <p className="text-sm text-mono-500 whitespace-pre-wrap">
                {schedule.description}
              </p>
            </div>
          ))
        ) : (
          <p className="text-mono-100">날짜를 클릭해 일정을 추가해보세요.</p>
        )}
      </div>
    </ScrollContainerBox>
  );
};

export default memo(ScheduleView);
