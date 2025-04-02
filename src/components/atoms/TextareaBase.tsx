import { extendVariants, Textarea } from '@heroui/react';

export const CustomTextarea = extendVariants(Textarea, {
  variants: {
    color: {
      custom: {
        base: 'rounded-lg',
        input: 'text-mono_900 placeholder:text-mono_300',
      },
    },
  },
});
