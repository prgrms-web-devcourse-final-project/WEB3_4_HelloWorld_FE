'use client';

import { RadioGroup } from '@headlessui/react';

interface GenderSelectorProps {
  selectedGender: string;
  setSelectedGender: (gender: string) => void;
  width?: string;
  height?: string;
  marginBottom?: string;
}

const genderOptions = ['남성', '여성'];

const GenderSelector = ({
  selectedGender,
  setSelectedGender,
  width = '214px',
  height = '40px',
  marginBottom = '60px',
}: GenderSelectorProps) => {
  return (
    <div className="flex flex-col gap-2" style={{ marginBottom }}>
      <label className="text-sm font-medium" htmlFor="gender-selector">
        성별 <span className="text-main">*</span>
      </label>

      <RadioGroup
        className="flex gap-6"
        id="gender-selector"
        value={selectedGender}
        onChange={setSelectedGender}
      >
        {genderOptions.map((gender) => (
          <RadioGroup.Option
            key={gender}
            className={({ checked }) =>
              `flex items-center justify-center text-sm font-medium border cursor-pointer transition 
              ${
                checked
                  ? 'bg-mono_900 text-mono_000 dark:bg-mono_900 dark:text-mono_100'
                  : 'border-mono_400 text-mono_900 dark:border-mono_400 dark:text-mono_900'
              }
              rounded-lg`
            }
            style={{ width, height }}
            value={gender}
          >
            {gender}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    </div>
  );
};

export default GenderSelector;
