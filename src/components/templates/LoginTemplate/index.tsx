'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { useAuthStore } from '@/stores/authStore';
import StepZero from '@/components/molecules/LoginTemplatesForm/StepZero';
import StepUser from '@/components/molecules/LoginTemplatesForm/StepUser';
import StepTrainer from '@/components/molecules/LoginTemplatesForm/StepTrainer';
import ProgressWrapper from '@/components/molecules/LoginTemplatesForm/ProgressWrapper';

const LoginTemplate = () => {
  const searchParams = useSearchParams();

  const additionalInfoCompleted = searchParams.get('additionalInfoCompleted');
  const role = searchParams.get('role') as 'member' | 'trainer' | null;
  const oauthId = searchParams.get('oauthId');

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [birth, setBirth] = useState('');
  const [selectedTab, setSelectedTab] = useState<'user' | 'trainer'>('user');
  const [selectedTrainerRole, setSelectedTrainerRole] = useState<
    'owner' | 'trainer' | null
  >(null);
  const [progress, setProgress] = useState(0);

  const { isLoggedIn, setAuth } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = '/';
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (additionalInfoCompleted === 'false') {
      setStep(1);
      if (role) {
        setSelectedTab(role === 'member' ? 'user' : 'trainer');
      }
    }
    // 임시 데이터라
    if (additionalInfoCompleted === 'true' && role) {
      setAuth({
        isLoggedIn: true,
        loginId: 1,
        nickname: '닉네임',
        profileImage: '프로필',
        userType: role as 'member' | 'trainer',
      });
      window.location.href = '/';
    }
  }, [additionalInfoCompleted, role, oauthId, setAuth]);

  useEffect(() => {
    setProgress(step === 2 ? 100 : step === 1 ? 50 : 0);
  }, [step]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-[1920px] flex flex-col items-center pt-20 gap-y-[50px]">
        <h1 className="font-point text-4xl">
          Gym<span className="text-main">M</span>ate
        </h1>

        {step === 0 ? (
          <StepZero
            selectedTab={selectedTab}
            setSelectedTab={(tab) => {
              setSelectedTab(tab);
              setSelectedTrainerRole(null);
              setStep(0);
            }}
            onSocialLogin={(role) => {
              const loginUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth2/authorization/kakao?state=${role}`;

              window.location.href = loginUrl;
            }}
          />
        ) : (
          <ProgressWrapper progress={progress}>
            {selectedTab === 'user' ? (
              <StepUser
                birth={birth}
                formData={formData}
                setBirth={setBirth}
                setFormData={setFormData}
                setStep={setStep}
                step={step}
              />
            ) : (
              <StepTrainer
                formData={formData}
                selectedTrainerRole={selectedTrainerRole}
                setFormData={setFormData}
                setSelectedTrainerRole={setSelectedTrainerRole}
                setStep={setStep}
                step={step}
              />
            )}
          </ProgressWrapper>
        )}
      </div>
    </div>
  );
};

export default LoginTemplate;
