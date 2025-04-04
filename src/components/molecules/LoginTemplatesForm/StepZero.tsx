'use client';

import LoginTab from '@/app/login/components/LoginTab';
import SocialLoginButton from '@/app/login/components/SocialLoginButton';
import HomeLink from '@/app/login/components/HomeLink';

interface StepZeroProps {
  selectedTab: 'user' | 'trainer';
  setSelectedTab: (tab: 'user' | 'trainer') => void;
  //  파라미터 추가
  onSocialLogin: (role: 'MEMBER' | 'TRAINER') => void;
}

const StepZero = ({
  selectedTab,
  setSelectedTab,
  onSocialLogin,
}: StepZeroProps) => (
  <>
    <LoginTab
      selectedTab={selectedTab}
      setSelectedTab={(tab) => setSelectedTab(tab)}
    />
    <div className="flex flex-col gap-y-[45px]">
      <SocialLoginButton
        type="kakao"
        onClick={() =>
          onSocialLogin(selectedTab === 'user' ? 'MEMBER' : 'TRAINER')
        }
      />
      <SocialLoginButton type="naver" />
      <SocialLoginButton type="google" />
      <SocialLoginButton type="apple" />
    </div>
    <p className="text-sm text-mono_400">
      Thank you for using it. <HomeLink />
    </p>
  </>
);

export default StepZero;
