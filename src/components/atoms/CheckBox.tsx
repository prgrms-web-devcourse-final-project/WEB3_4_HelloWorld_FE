import { Checkbox, extendVariants } from '@heroui/react';

// ListboxItem을 위한 별도의 확장
export const MyCheckbox = extendVariants(Checkbox, {
  variants: {
    color: {
      test: {
        base: ' data-[selected]:bg-main  data-[hover]:bg-main border-1 block border-mono_200 m-0 max-w-full transition-all',
        wrapper: '  w-full',
        label:
          ' data-[selected]:text-mono_200 hover:text-gray-100 flex justify-center items-center ',
      },
    },
    size: {
      md: {
        base: 'text-base w-30',
      },
      full: {
        label: 'h-3 w-full ',
      },
    },
    radius: {
      bg_full: {
        base: 'rounded-full',
      },
      bg_sm: {
        base: 'rounded-small',
      },
      bg_md: {
        base: 'rounded-medium',
      },
      bg_lg: {
        base: 'rounded-large',
      },
    },
    isSelected: {
      true: {
        base: 'bg-main text-mono_200',
        label: 'text-mono_200',
      },
    },
    isFocusVisible: {
      true: {
        base: '',
      },
    },
  },
  compoundVariants: [
    {
      color: 'test',
      isSelected: true,
      className: ' font-semibold bg-main text-mono_200 ',
    },
  ],
});
