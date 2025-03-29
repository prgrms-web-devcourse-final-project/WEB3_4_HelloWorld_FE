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
        <label className="text-sm font-medium">
          개업일자 <span className="text-main">*</span>
        </label>
        <BirthSelect
          id="year"
          ariaLabel="개업 연도"
          options={years}
          required
          onChange={setYear}
          placeholder="연도"
        />
      </div>
      <div style={{ width: '33%' }}>
        <label className="text-sm font-medium">
          월 <span className="text-main">*</span>
        </label>
        <BirthSelect
          id="month"
          ariaLabel="개업 월"
          options={months}
          required
          onChange={setMonth}
          placeholder="월"
        />
      </div>
      <div style={{ width: '33%' }}>
        <label className="text-sm font-medium">
          일 <span className="text-main">*</span>
        </label>
        <BirthSelect
          id="day"
          ariaLabel="개업 일"
          options={days}
          required
          onChange={setDay}
          placeholder="일"
        />
      </div>
    </div>
  );
};

export default OpenDateInputGroup;
