import { extendVariants, Listbox, ListboxItem } from '@heroui/react';

// ListboxItem을 위한 별도의 확장
export const MyListboxItem = extendVariants(ListboxItem, {
  variants: {
    variant: {
      test: {
        base: 'text-mono_700 ',
        wrapper: 'px-2 py-1',
      },
    },
    isSelected: {
      true: {
        base: 'bg-main',
      },
    },
  },
  compoundVariants: [
    {
      variant: 'test',
      isSelected: true,
      className: 'bg-main/20 font-semibold text-main text-main px-2 py-1',
    },
  ],
  defaultVariants: {
    variant: 'test',
    isSelected: true,
  },
});

// Listbox 컴포넌트 확장
export const MyListBox = extendVariants(Listbox, {
  slots: {
    base: 'w-full',

    content: 'mt-2',
  },
  variants: {
    variant: {
      test: {},
    },
  },
  defaultVariants: {
    variant: 'test',
  },
});
