'use client';

import { Select, SelectItem } from '@heroui/react';

interface BankSelectProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  selectedBank: string;
  setSelectedBank: (bank: string) => void;
  width?: string;
  height?: string;
}

const bankOptions = [
  { key: '국민은행', label: '국민은행' },
  { key: '신한은행', label: '신한은행' },
  { key: '카카오뱅크', label: '카카오뱅크' },
  { key: '우리은행', label: '우리은행' },
  { key: '하나은행', label: '하나은행' },
];

const BankSelect = ({
  label = '은행명',
  placeholder = '은행을 선택하세요',
  required = false,
  selectedBank,
  setSelectedBank,
  width = '100%',
  height = '62px',
}: BankSelectProps) => (
  <div className="flex flex-col gap-2" style={{ width }}>
    <label className="text-sm font-medium">
      {label} {required && <span className="text-main">*</span>}
    </label>
    <Select
      aria-label={label}
      selectedKeys={[selectedBank]}
      onChange={(e) => setSelectedBank(e.target.value)}
      placeholder={placeholder}
      className="text-sm"
      classNames={{ trigger: `h-[${height}]` }}
      isRequired={required}
    >
      {bankOptions.map((bank) => (
        <SelectItem key={bank.key} value={bank.key}>
          {bank.label}
        </SelectItem>
      ))}
    </Select>
  </div>
);

export default BankSelect;
