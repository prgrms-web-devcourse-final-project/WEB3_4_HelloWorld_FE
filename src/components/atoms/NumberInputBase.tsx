import { extendVariants, NumberInput } from '@heroui/react';

export const NumberInputBase = extendVariants(NumberInput, {
  variants: {
    size: {
      xs: {
        inputWrapper: 'h-10 rounded-[12px]', // 인풋 전체 높이 속성 같습니다
        input: '', //인풋 안에 텍스트 속성 같습니다
      },
    },
  },

  compoundVariants: [
    {
      color: 'primary',
    },
  ],
});
