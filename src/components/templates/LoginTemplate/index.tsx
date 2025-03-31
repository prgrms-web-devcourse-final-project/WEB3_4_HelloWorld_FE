'use client';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import StepZero from '@/components/molecules/LoginTemplatesForm/StepZero';
import StepUser from '@/components/molecules/LoginTemplatesForm/StepUser';
import StepTrainer from '@/components/molecules/LoginTemplatesForm/StepTrainer';
import ProgressWrapper from '@/components/molecules/LoginTemplatesForm/ProgressWrapper';

const LoginTemplate = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [birth, setBirth] = useState('');
  const [selectedTab, setSelectedTab] = useState<'user' | 'trainer'>('user');
  const [selectedTrainerRole, setSelectedTrainerRole] = useState<
    'owner' | 'trainer' | null
  >(null);
  const [progress, setProgress] = useState(0);

  const { isLoggedIn, handleLogin } = useAuthStore();

  // 로그인 상태가 이미 true면 로그인 페이지 대신 메인 등으로 리다이렉션할 수 있음.
  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = '/'; // 예: 메인 페이지로 이동
    }
  }, [isLoggedIn]);

  // StepZero에서 소셜 로그인 버튼 클릭 시 호출되는 함수.
  // 선택된 탭에 따라 'MEMBER' 또는 'TRAINER' 역할을 전달.
  const handleSocialLogin = (role: 'MEMBER' | 'TRAINER') => {
    handleLogin(role);
  };

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
            onSocialLogin={handleSocialLogin}
          />
        ) : (
          <ProgressWrapper progress={progress}>
            {selectedTab === 'user' ? (
              <StepUser
                step={step}
                setStep={setStep}
                formData={formData}
                setFormData={setFormData}
                birth={birth}
                setBirth={setBirth}
              />
            ) : (
              <StepTrainer
                step={step}
                formData={formData}
                setFormData={setFormData}
                setStep={setStep}
                selectedTrainerRole={selectedTrainerRole}
                setSelectedTrainerRole={setSelectedTrainerRole}
              />
            )}
          </ProgressWrapper>
        )}
      </div>
    </div>
  );
};

export default LoginTemplate;
