'use client';

import { FC } from 'react';
import { Select, SelectItem } from '@nextui-org/react';

interface BirthSelectProps {
  options: number[];
  placeholder?: string;
  required?: boolean;
  onChange: (value: string) => void;
  width?: string;
  height?: string;
  ariaLabel: string;
  id: string;
}

const BirthSelect: FC<BirthSelectProps> = ({
  options = [],
  placeholder = '',
  required = false,
  onChange,
  width = '140px',
  height = '38px',
  ariaLabel,
  id,
}) => {
  return (
    <div style={{ width }}>
      <label className="sr-only" htmlFor={id}>
        {ariaLabel}
      </label>

      <Select
        aria-label={ariaLabel}
        classNames={{
          base: 'w-full',
          trigger: `h-[${height}]`,
          popoverContent: 'z-[100]',
        }}
        id={id}
        isRequired={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <SelectItem key={String(opt)} value={String(opt)}>
            {String(opt).padStart(2, '0')}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default BirthSelect;
