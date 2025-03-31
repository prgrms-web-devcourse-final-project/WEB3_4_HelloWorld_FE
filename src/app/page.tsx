'use client';

import MainGymSection from '@/app/components/sections/MainGymSection';
import MainVisualSection from '@/app/components/sections/MainVisualSection';
import MainPtSection from '@/app/components/sections/MainPtSection';
// import Loading from '@/app/Loading';

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-20">
        <MainVisualSection />
        <MainGymSection />
        <MainPtSection />
        <div className="py-[1000px]" />
      </div>
      {/* <div className="container mx-auto max-w-screen-2xl" /> */}
    </>
  );
}
