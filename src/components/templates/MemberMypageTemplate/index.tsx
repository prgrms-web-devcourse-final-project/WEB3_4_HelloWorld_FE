import React from 'react';

import { MyPageTabs } from '@/components/molecules/mypage/MypageTaps';

export const MyPageTemplate: React.FC = () => {
  return (
    <div className="my-page-template min-h-screen">
      <header className="my-page-header p-4 border-b">
        <h1 className="text-xl font-bold">마이페이지</h1>
      </header>

      <main className="my-page-content p-4">
        <MyPageTabs />

        <div className="tab-content mt-6" />
      </main>
    </div>
  );
};
