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

  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

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
          <label
            className="text-sm text-mono_700 font-medium mb-[5px] flex items-center gap-1"
            htmlFor="birth-year"
          >
            생년월일<span className="text-main">*</span>
          </label>
          <BirthSelect
            required
            ariaLabel="출생 연도"
            height="38px"
            id="birth-year"
            options={years}
            placeholder="2000"
            width="214px"
            onChange={setYear}
          />
        </div>

        <div className="flex flex-col w-[91px]">
          <label
            className="text-sm text-mono_700 font-medium mb-[5px] flex items-center gap-1"
            htmlFor="birth-month"
          >
            월<span className="text-main">*</span>
          </label>
          <BirthSelect
            required
            ariaLabel="출생 월"
            height="38px"
            id="birth-month"
            options={months}
            placeholder="01"
            width="91px"
            onChange={setMonth}
          />
        </div>

        <div className="flex flex-col w-[91px]">
          <label
            className="text-sm text-mono_700 font-medium mb-[5px] flex items-center gap-1"
            htmlFor="birth-day"
          >
            일<span className="text-main">*</span>
          </label>
          <BirthSelect
            required
            ariaLabel="출생 일"
            height="38px"
            id="birth-day"
            options={days}
            placeholder="01"
            width="91px"
            onChange={setDay}
          />
        </div>
      </div>
    </div>
  );
};

export default BirthdayInputGroup;
