'use client';

import { Tab, Tabs } from '@heroui/react';

import { MyCheckbox } from '@/components/atoms/CheckBox';
import { ptSchedules } from '@/constants/pt_schedules';

// 타입 정의
type AvailableTimesType = {
  [key: string]: number[];
};

const formatTime = (time: number): string => {
  const period = time >= 12 ? '오후' : '오전';
  const displayHour = time > 12 ? time - 12 : time;

  return `${period} ${displayHour}:00`;
};

export default function ScheduleTimeCheckGroup({
  isReadOnly = true,
}: {
  isReadOnly?: boolean;
}) {
  const availableTimes: AvailableTimesType = {
    '3': [9, 10, 11, 12, 13, 14, 15, 16, 17],
    '4': [15, 16, 17],
  };

  return (
    <div>
      <Tabs fullWidth={true}>
        {Object.entries(availableTimes).map(([key, value]) => (
          <Tab key={key} title={ptSchedules[Number(key)].label}>
            <div className="grid grid-cols-3 py-5 gap-2">
              {value.map((time) => (
                <MyCheckbox
                  key={time}
                  color="test"
                  isDisabled={isReadOnly}
                  radius="bg_sm"
                >
                  {formatTime(time)}
                </MyCheckbox>
              ))}
            </div>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
