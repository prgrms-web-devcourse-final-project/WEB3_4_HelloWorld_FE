'use client';

import type { ThemeProviderProps } from 'next-themes';

import * as React from 'react';
import { ToastProvider } from '@heroui/toast';
import { HeroUIProvider } from '@heroui/system';
import { useRouter } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

import ReactQueryClientProvider from '@/config/react_query_provider';

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>['push']>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <ReactQueryClientProvider>
      <HeroUIProvider navigate={router.push}>
        <ToastProvider />

        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </HeroUIProvider>
    </ReactQueryClientProvider>
  );
}
