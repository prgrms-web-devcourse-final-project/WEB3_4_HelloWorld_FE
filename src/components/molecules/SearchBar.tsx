import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

import { MyButton } from '../atoms/Button';
import { MyInput } from '../atoms/Input';

export default function SearchBar({ placeholder }: { placeholder: string }) {
  return (
    <>
      <div className="flex gap-2">
        <MyInput
          isClearable
          placeholder={placeholder}
          size="search"
          startContent={
            <MagnifyingGlassIcon className="w-4 h-4  text-mono_400" />
          }
        />
        <MyButton size="md">검색</MyButton>
      </div>
    </>
  );
}
