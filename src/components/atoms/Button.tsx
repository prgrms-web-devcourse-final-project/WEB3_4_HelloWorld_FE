// MyButton.tsx
import { extendVariants, Button } from '@heroui/react';

export const MyButton = extendVariants(Button, {
  variants: {
    variant: {
      light: ' text-mono_800 text-md font-semibold  rounded-[0px]',
    },
    // <- modify/add variants
    color: {
      main: 'text-main-foreground bg-main ',
      orange: 'bg-[#ff8c00] text-[#fff]',
      violet: 'bg-[#8b5cf6] text-[#fff]',
      transparent: 'bg-background text-foreground',
    },
    isDisabled: {
      true: 'bg-[#eaeaea] text-[#000] opacity-50 cursor-not-allowed',
    },
    size: {
      xs: 'px-2 min-w-12 py-2 text-tiny gap-1 rounded-small',
      md: 'px-4 min-w-20 py-2 text-small gap-2 rounded-small',
      xl: 'px-8 min-w-28 py-2 text-large gap-4 rounded-medium',
      full: 'px-8 w-full py-2 text-large gap-4 rounded-medium',
    },
  },
  defaultVariants: {
    color: 'main',
    size: 'xl',
  },
  compoundVariants: [
    // <- modify/add compound variants
    {
      color: 'primary',
    },
  ],
});
