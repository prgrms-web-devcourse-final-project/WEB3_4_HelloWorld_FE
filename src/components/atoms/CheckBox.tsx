import { Checkbox, extendVariants } from '@heroui/react';

// ListboxItem을 위한 별도의 확장
export const MyCheckbox = extendVariants(Checkbox, {
  variants: {
    color: {
      test: {
        base: ' border-1 block border-mono_200 m-0 max-w-full transition-all',
        wrapper: ' hidden w-full',
        label:
          'text-mono_700 data-[selected]:text-mono_200 flex justify-center items-center ',
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
        base: 'bg-main',
        label: 'text-main-foreground',
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
      className: ' font-semibold bg-main  ',
    },
  ],
  defaultVariants: {
    color: 'test',
  },
});
