'use client';

import { FC, useEffect, useState } from 'react';

import BirthSelect from '@/components/atoms/BirthSelect';

interface OpenDateInputGroupProps {
  onDateChange: (date: string) => void;
}

const OpenDateInputGroup: FC<OpenDateInputGroupProps> = ({ onDateChange }) => {
  const years = Array.from({ length: 30 }, (_, i) => 2000 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  useEffect(() => {
    if (year && month && day) {
      onDateChange(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
    }
  }, [year, month, day, onDateChange]);

  return (
    <div className="flex gap-4 mb-[60px]">
      <div style={{ width: '33%' }}>
        <label className="text-sm font-medium" htmlFor="year">
          개업일자 <span className="text-main">*</span>
        </label>
        <BirthSelect
          required
          ariaLabel="개업 연도"
          id="year"
          options={years}
          placeholder="연도"
          onChange={setYear}
        />
      </div>
      <div style={{ width: '33%' }}>
        <label className="text-sm font-medium" htmlFor="month">
          월 <span className="text-main">*</span>
        </label>
        <BirthSelect
          required
          ariaLabel="개업 월"
          id="month"
          options={months}
          placeholder="월"
          onChange={setMonth}
        />
      </div>
      <div style={{ width: '33%' }}>
        <label className="text-sm font-medium" htmlFor="day">
          일 <span className="text-main">*</span>
        </label>
        <BirthSelect
          required
          ariaLabel="개업 일"
          id="day"
          options={days}
          placeholder="일"
          onChange={setDay}
        />
      </div>
    </div>
  );
};

export default OpenDateInputGroup;
