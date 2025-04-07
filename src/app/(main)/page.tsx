'use client';

import MainShopSection from '@/app/(main)/components/sections/MainShopSection';
import MainGymMateSection from '@/app/(main)/components/sections/MainGymMateSection';
import MainGymSection from '@/app/(main)/components/sections/MainGymSection';
import MainVisualSection from '@/app/(main)/components/sections/MainVisualSection';
import MainPtSection from '@/app/(main)/components/sections/MainPtSection';
import FetchAuthOnMain from '@/utils/userType';
import ChatTemplate from '@/components/templates/ChatTemplate';
// import Loading from '@/app/Loading';

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-y-44">
        <FetchAuthOnMain /> {/* 유저 타입 확인 */}
        <MainVisualSection />
        <MainGymSection />
        <MainPtSection />
        <MainShopSection />
        <MainGymMateSection />
      </div>
      {/* <div className="container mx-auto max-w-screen-2xl" /> */}
      <ChatTemplate />
    </>
  );
}
