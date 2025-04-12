'use client';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Select, SelectItem, SharedSelection } from '@heroui/react';

import { MyButton } from '../atoms/Button';
import { MyInput } from '../atoms/Input';

export default function SearchBar({
  placeholder,
  inputChange,
  onSearch,
  searchOption,
  searchChange,
}: {
  placeholder: string;
  inputChange: (value: string) => void;
  onSearch: () => void;
  searchOption: {
    key: string;
    label: string;
  }[];
  searchChange: (key: SharedSelection) => void;
}) {
  return (
    <>
      <div className="flex gap-2">
        <Select
          aria-label="검색 옵션"
          className="w-44"
          onSelectionChange={searchChange}
        >
          {searchOption.map((keyword) => (
            <SelectItem key={keyword.key}>{keyword.label}</SelectItem>
          ))}
        </Select>
        <MyInput
          fullWidth
          isClearable
          aria-label={placeholder}
          placeholder={placeholder}
          size="search"
          startContent={
            <MagnifyingGlassIcon className="w-4 h-4  text-mono_400" />
          }
          onChange={(e) => inputChange(e.target.value)}
        />
        <MyButton size="md" onPress={onSearch}>
          검색
        </MyButton>
      </div>
    </>
  );
}
