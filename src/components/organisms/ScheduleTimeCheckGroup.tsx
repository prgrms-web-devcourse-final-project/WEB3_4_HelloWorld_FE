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
  isSelectTap = true,
  availableTimes,
  setSelectedTab,
  selectedTime,
  setSelectTime,
  selectedTab,
}: {
  isSelectTap?: boolean;
  isReadOnly?: boolean;
  availableTimes?: AvailableTimesType | null;
  selectedTab?: string;
  selectedTime?: AvailableTimesType | null;
  setSelectTime?: (value: number, e: any) => void;
  setSelectedTab?: (value: number) => void;
}) {
  if (!availableTimes)
    return <p className=" w-full text-center">스케줄이 없습니다.</p>;

  return (
    <div>
      <Tabs
        fullWidth={true}
        selectedKey={selectedTab}
        onSelectionChange={(key) => setSelectedTab?.(Number(key))}
      >
        {Object.entries(availableTimes).map(([key, value]) => (
          <Tab key={key} title={ptSchedules[Number(key)].label}>
            <div className="grid grid-cols-3 py-5 gap-2">
              {value.map((time) => (
                <MyCheckbox
                  key={time}
                  color="test"
                  isDisabled={isReadOnly}
                  isSelected={selectedTime?.[key]?.includes(time) ?? false}
                  name={time.toString()}
                  radius="bg_sm"
                  onChange={(e) =>
                    setSelectTime?.(Number(e.target.name), e.target.checked)
                  }
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
