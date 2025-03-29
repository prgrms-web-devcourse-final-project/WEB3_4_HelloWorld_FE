'use client';

import { useState, useEffect } from 'react';
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

  const handleSocialLogin = () => setStep(1);

  const handleSelectTrainerRole = (role: 'owner' | 'trainer') => {
    setSelectedTrainerRole(role);
    setStep(2);
  };

  useEffect(() => {
    if (selectedTab === 'trainer') {
      setProgress(step === 2 ? 100 : step === 1 ? 50 : 0);
    } else {
      setProgress(step === 2 ? 100 : step === 1 ? 50 : 0);
    }
  }, [selectedTab, step]);

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
                setSelectedTrainerRole={handleSelectTrainerRole}
              />
            )}
          </ProgressWrapper>
        )}
      </div>
    </div>
  );
};

export default LoginTemplate;
