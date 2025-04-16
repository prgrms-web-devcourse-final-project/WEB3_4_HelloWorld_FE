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
      transform: {
        'preserve-3d': 'preserve-3d',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
        pretendard: ['var(--font-pretendard)'],
        point: ['var(--font-paperlogy)'],
        subPoint: ['var(--font-samliphopang)'],
      },
      keyframes: {
        'move-forever': {
          '0%': { transform: 'translate3d(-90px,0,0)' },
          '100%': { transform: 'translate3d(85px,0,0)' },
        },
      },
      animation: {
        'wave-1':
          'move-forever 7s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite -2s',
        'wave-2':
          'move-forever 10s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite -3s',
        'wave-3':
          'move-forever 13s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite -4s',
        'wave-4':
          'move-forever 20s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite -5s',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    heroui(hero_ui_config),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
