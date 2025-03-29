import { Fira_Code as FontMono, Inter as FontSans } from 'next/font/google';
import localFont from 'next/font/local';

// 인터 폰트 정의
export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

// 폰트모노 폰트 정의
export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
});

//프리텐다드 폰트 정의
export const pretendard = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

// 페이퍼로지 (포인트)폰트 정의
export const paperlogy = localFont({
  src: [
    {
      path: '../assets/fonts/Paperlogy-1Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Paperlogy-2ExtraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Paperlogy-3Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Paperlogy-4Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Paperlogy-5Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Paperlogy-6SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Paperlogy-7Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Paperlogy-8ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Paperlogy-9Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-paperlogy',
});

//삽립호빵체 폰트 정의
export const samliphopang = localFont({
  src: '../assets/fonts/SDSamliphopangcheTTFBasic.ttf',
  display: 'swap',
  variable: '--font-samliphopang',
});
