'use client';

import { useState, Fragment } from 'react';

import LoginTab from '@/app/login/components/LoginTab';
import SocialLoginButton from '@/app/login/components/SocialLoginButton';
import HomeLink from '@/app/login/components/HomeLink';
import Step1Form from '@/components/templates/LoginTemplate/UserLoginOne';
import Step2Form from '@/components/templates/LoginTemplate/UserLoginTwo';
import ProgressBar from '@/app/login/components/ProgressBar';
import ReturnHomeMessage from '@/app/login/components/HomeLink/HomeReturnMsg';

const LoginTemplate = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [birth, setBirth] = useState('');

  const progress = step === 1 ? 50 : step === 2 ? 100 : 0;

  const handleKakaoLogin = () => {
    setStep(1);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-[1920px] flex flex-col items-center pt-20 gap-y-[50px]">
        <h1 className="font-point text-4xl">
          Gym<span className="text-main">M</span>ate
        </h1>

        {step === 0 ? (
          <Fragment>
            <LoginTab />
            <div className="flex flex-col gap-y-[45px]">
              <SocialLoginButton type="kakao" onClick={handleKakaoLogin} />
              <SocialLoginButton type="naver" />
              <SocialLoginButton type="google" />
              <SocialLoginButton type="apple" />
            </div>
            <p className="text-sm text-mono_400">
              Thank you for using it. <HomeLink />
            </p>
          </Fragment>
        ) : (
          <Fragment>
            <ProgressBar
              showValueLabel
              className="w-[452px] h-2 rounded-full"
              percent={progress}
            />
            {step === 1 ? (
              <Step1Form
                birth={birth}
                setBirth={setBirth}
                setFormData={setFormData}
                setStep={setStep}
              />
            ) : (
              <Step2Form
                formData={formData}
                setFormData={setFormData}
                setStep={setStep}
              />
            )}
            <ReturnHomeMessage />
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default LoginTemplate;
