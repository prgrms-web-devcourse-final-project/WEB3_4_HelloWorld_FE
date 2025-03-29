'use client';

import { RadioGroup } from '@headlessui/react';
import { useState } from 'react';

interface GenderSelectorProps {
  width?: string;
  height?: string;
  marginBottom?: string;
}

const genderOptions = ['남성', '여성'];

const GenderSelector = ({
  width = '214px',
  height = '40px',
  marginBottom = '60px',
}: GenderSelectorProps) => {
  const [selectedGender, setSelectedGender] = useState('남성');

  return (
    <div className="flex flex-col gap-2 mb-6">
      <label className="text-sm font-medium">
        성별 <span className="text-main">*</span>
      </label>

      <RadioGroup
        value={selectedGender}
        onChange={setSelectedGender}
        className="flex gap-6"
        style={{ marginBottom }}
      >
        {genderOptions.map((gender) => (
          <RadioGroup.Option
            key={gender}
            value={gender}
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
          >
            {gender}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    </div>
  );
};

export default GenderSelector;
