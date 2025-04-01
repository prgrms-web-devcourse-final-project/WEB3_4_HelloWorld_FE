'use client';

import MainShopSection from '@/app/components/sections/MainShopSection';
import MainGymMateSection from '@/app/components/sections/MainGymMateSection';
import MainGymSection from '@/app/components/sections/MainGymSection';
import MainVisualSection from '@/app/components/sections/MainVisualSection';
import MainPtSection from '@/app/components/sections/MainPtSection';
// import Loading from '@/app/Loading';

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-y-44">
        <MainVisualSection />
        <MainGymSection />
        <MainPtSection />
        <MainShopSection />
        <MainGymMateSection />
      </div>
      {/* <div className="container mx-auto max-w-screen-2xl" /> */}
    </>
  );
}
