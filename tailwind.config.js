import { heroui } from '@heroui/theme';
import { hero_ui_config } from './src/config/hero_ui_config.ts';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
        pretendard: ['var(--font-pretendard)'],
        point: ['var(--font-paperlogy)'],
        subPoint: ['var(--font-samliphopang)'],
      },
    },
  },
  darkMode: 'class',
  plugins: [heroui(hero_ui_config)],
};
