'use client';

import { FC, useEffect, useState } from 'react';
import BirthSelect from '@/components/atoms/BirthSelect';

interface BirthdayInputGroupProps {
  onBirthChange: (birth: string) => void;
}

const BirthdayInputGroup: FC<BirthdayInputGroupProps> = ({ onBirthChange }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const [year, setYear] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [day, setDay] = useState<string>('');

  useEffect(() => {
    if (year && month && day) {
      const birth = `${year.padStart(4, '0')}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      onBirthChange(birth);
    }
  }, [year, month, day, onBirthChange]);

  return (
    <div className="mb-[50px]">
      <div className="w-[452px] flex gap-[28px]">
        <div className="flex flex-col w-[214px]">
          <label className="text-sm text-mono_700 font-medium mb-[5px] flex items-center gap-1">
            생년월일<span className="text-main">*</span>
          </label>
          <BirthSelect
            id="birth-year"
            ariaLabel="출생 연도"
            options={years}
            onChange={setYear}
            required
            width="214px"
            height="38px"
            placeholder="2000"
          />
        </div>

        <div className="flex flex-col w-[91px]">
          <label className="text-sm text-mono_700 font-medium mb-[5px] flex items-center gap-1">
            월<span className="text-main">*</span>
          </label>
          <BirthSelect
            id="birth-month"
            ariaLabel="출생 월"
            options={months}
            onChange={setMonth}
            required
            width="91px"
            height="38px"
            placeholder="01"
          />
        </div>

        <div className="flex flex-col w-[91px]">
          <label className="text-sm text-mono_700 font-medium mb-[5px] flex items-center gap-1">
            일<span className="text-main">*</span>
          </label>
          <BirthSelect
            id="birth-day"
            ariaLabel="출생 일"
            options={days}
            onChange={setDay}
            required
            width="91px"
            height="38px"
            placeholder="01"
          />
        </div>
      </div>
    </div>
  );
};

export default BirthdayInputGroup;
