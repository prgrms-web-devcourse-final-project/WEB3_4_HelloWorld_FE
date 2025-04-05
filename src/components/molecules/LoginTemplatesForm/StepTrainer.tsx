'use client';

import { FC } from 'react';

import TrainerTemplate from '@/components/templates/LoginTemplate/TrainerTemplate';
import TrainerLoginForm from '@/components/templates/LoginTemplate/TrainerLoginForm';
import OwnerLoginForm from '@/components/templates/LoginTemplate/OwnerLoginForm';
import { UserData } from '@/types/UserData';

// 역할 타입 정의
type TrainerRole = 'owner' | 'trainer';

// StepTrainerProps 타입 정의
interface StepTrainerProps {
  step: number;
  formData: UserData;
  setFormData: React.Dispatch<React.SetStateAction<UserData>>;
  setStep: (step: number) => void;
  selectedTrainerRole: TrainerRole | null;
  setSelectedTrainerRole: (role: TrainerRole) => void;
}

// 컴포넌트 정의
const StepTrainer: FC<StepTrainerProps> = ({
  step,
  selectedTrainerRole,
  setSelectedTrainerRole,
  setStep,
}) => {
  const handleSelectRole = (role: TrainerRole): void => {
    setSelectedTrainerRole(role);
    setStep(2);
  };

  return (
    <>
      <TrainerTemplate
        selectedTrainerRole={selectedTrainerRole}
        setSelectedTrainerRole={handleSelectRole}
      />

      {selectedTrainerRole === 'owner' && step === 2 && <OwnerLoginForm />}

      {selectedTrainerRole === 'trainer' && step === 2 && <TrainerLoginForm />}
    </>
  );
};

export default StepTrainer;
