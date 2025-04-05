'use client';

import { Checkbox } from '@nextui-org/react';

interface Props {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

const FilterCheckboxList = ({ options, selected, onChange }: Props) => (
  <div className="flex flex-col gap-1">
    {options.map((option) => (
      <Checkbox
        key={option}
        className="text-sm"
        isSelected={selected.includes(option)}
        radius="sm"
        size="sm"
        onValueChange={(checked) =>
          onChange(
            checked
              ? [...selected, option]
              : selected.filter((i) => i !== option),
          )
        }
      >
        {option}
      </Checkbox>
    ))}
  </div>
);

export default FilterCheckboxList;
