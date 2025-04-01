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
          <p className="mt-[200px] text-mono-100 text-center">
            일정을 확인 하고 싶은 날짜를 선택해주세요.
          </p>
        )}
      </div>
    </ScrollContainerBox>
  );
};

export default memo(ScheduleView);
