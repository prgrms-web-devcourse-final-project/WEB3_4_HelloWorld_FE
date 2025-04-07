// components/atoms/MyButton.tsx

import { extendVariants, Button } from '@heroui/react';

export const MyButton = extendVariants(Button, {
  variants: {
    variant: {
      light: 'text-mono_800 text-md font-semibold rounded-[0px]',
      facility: '',
    },
    color: {
      main: 'text-main-foreground bg-main',
      orange: 'bg-[#ff8c00] text-[#fff]',
      violet: 'bg-[#8b5cf6] text-[#fff]',
      transparent: 'bg-background text-foreground',
      mono: 'bg-mono_050 text-mono_600 border border-mono_200',
      facility: 'text-mono_600 bg-mono_050  hover:bg-main hover:text-mono_100',
    },
    isDisabled: {
      true: 'bg-[#eaeaea] text-[#000] opacity-50 cursor-not-allowed',
    },
    size: {
      xs: 'px-2 min-w-12 py-2 text-tiny gap-1 rounded-small',
      md: 'px-4 min-w-20 py-2 text-small gap-2 rounded-small',
      xl: 'px-8 min-w-28 py-2 text-large gap-4 rounded-medium',
      full: 'px-8 w-full py-2 text-large gap-4 rounded-medium',
      custom: 'w-[128px] h-[36px] text-[14px] rounded-[8px]',
      facility:
        'py-3 px-6 rounded-small flex flex-col items-center justify-center gap-2',
    },
  },
  defaultVariants: {
    color: 'main',
    size: 'xl',
  },
  compoundVariants: [
    {
      color: 'primary',
    },
  ],
});
