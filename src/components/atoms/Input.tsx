import { extendVariants, Input } from '@heroui/react';

export const MyInput = extendVariants(Input, {
  variants: {
    size: {
      base: {
        mainWrapper: 'text-tiny gap-1 rounded-small',
      },
      md: {
        mainWrapper: 'w-[300px]',
      },
      xl: {
        mainWrapper: 'text-large gap-4 rounded-medium',
      },
      search: {
        mainWrapper: 'w-full h-full ',
        inputWrapper: 'w-full h-full rounded-small',
        input: 'text-small',
      },
    },
  },
  defaultVariants: {
    size: 'xl',
  },
});
