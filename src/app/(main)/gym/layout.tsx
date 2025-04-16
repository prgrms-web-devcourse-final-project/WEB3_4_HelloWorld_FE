// src/app/gym/layout.tsx
'use client';

import { Toaster } from 'react-hot-toast';

export default function GymLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
    </>
  );
}
