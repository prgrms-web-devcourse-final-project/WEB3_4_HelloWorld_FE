import React from 'react';

export default function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full fixed top-0 left-0 z-50 flex items-center justify-center h-screen bg-black/50">
        {children}
      </div>
    </>
  );
}
