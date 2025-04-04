'use client';

import { Tabs, Tab } from '@nextui-org/react';
import { memo, useState } from 'react';

import UserForm from '@/components/organisms/MyPage/UserForm';
import HistoryList from '@/components/templates/MemberMypageTemplate/HistoryList';
import CouponListHistory from '@/components/templates/MemberMypageTemplate/CouponListHistory';
import Logout from '@/components/templates/MemberMypageTemplate/Logout';

const TABS = [
  { key: 'user', title: '개인정보' },
  { key: 'history', title: '나의 수강 내역' },
  { key: 'coupon', title: '나의 결제 내역' },
  { key: 'logout', title: '회원탈퇴' },
];

const MyPageTemplate = () => {
  const [selectedTab, setSelectedTab] = useState<
    'user' | 'history' | 'coupon' | 'logout'
  >('user');

  return (
    <div className="pt-[300px] w-full flex justify-center">
      <div className="w-full max-w-[1400px] px-4">
        <div className="flex items-center border-b pb-2">
          <h2 className="font-point text-3xl font-bold text-mono_900 whitespace-nowrap">
            📌 마이페이지
          </h2>

          <div className="ml-[740px] flex-1">
            <Tabs
              aria-label="MyPage Tabs"
              classNames={{ tabList: 'gap-6', cursor: 'bg-main' }}
              color="primary"
              selectedKey={selectedTab}
              variant="underlined"
              onSelectionChange={(key) => setSelectedTab(key as any)}
            >
              {TABS.map(({ key, title }) => (
                <Tab
                  key={key}
                  className={
                    key === 'logout'
                      ? 'text-main data-[selected=true]:text-main font-semibold'
                      : 'text-base text-mono_500 data-[selected=true]:text-main font-semibold'
                  }
                  title={title}
                />
              ))}
            </Tabs>
          </div>
        </div>

        <div className="mt-[100px] w-full">
          {
            {
              user: (
                <div className="flex justify-center">
                  <div className="w-full max-w-[640px] ml-[150px]">
                    <UserForm />
                  </div>
                </div>
              ),
              history: (
                <div className="flex justify-start pl-[50px]">
                  <div className="w-[1305px] h-[550px]">
                    <HistoryList />
                  </div>
                </div>
              ),
              coupon: (
                <div className="flex justify-start pl-[50px]">
                  <div className="w-[1305px] h-[550px]">
                    <CouponListHistory />
                  </div>
                </div>
              ),
              logout: <Logout />, // ✅ 컴포넌트로 분리
            }[selectedTab]
          }
        </div>
      </div>
    </div>
  );
};

export default memo(MyPageTemplate);
