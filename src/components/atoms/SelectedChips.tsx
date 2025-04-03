'use client';

import { Chip } from '@nextui-org/react';

interface Props {
  items: string[];
  onRemove: (item: string) => void;
}

const SelectedChips = ({ items, onRemove }: Props) => (
  <div className="flex flex-wrap gap-2">
    {items.map((item) => (
      <Chip
        key={item}
        className="bg-mono_900 text-mono_000 text-sm"
        radius="sm"
        variant="solid"
        onClose={() => onRemove(item)}
      >
        {item}
      </Chip>
    ))}
  </div>
);

export default SelectedChips;
