import React from 'react';

import { TabList } from './TabList';

export const MyPageTabs: React.FC = () => {
  // 보여줄 탭 정보
  const myPageTabData = [
    { key: 'info', title: '개인정보' },
    { key: 'courses', title: '나의 수강내역' },
    { key: 'ticket', title: '나의 이용권' },
    { key: 'logout', title: '로그아웃' },
  ];

  return (
    <section className="my-page-tabs-organism">
      <TabList tabs={myPageTabData} variant="underlined" />
    </section>
  );
};
