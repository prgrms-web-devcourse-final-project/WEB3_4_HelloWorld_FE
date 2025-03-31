'use client';

import TrainerTemplate from '@/components/templates/LoginTemplate/TrainerTemplate';
import TrainerLoginForm from '@/components/templates/LoginTemplate/TrainerLoginForm';
import OwnerLoginForm from '@/components/templates/LoginTemplate/OwnerLoginForm';

interface StepTrainerProps {
  step: number;
  formData: Record<string, any>;
  setFormData: (data: Record<string, any>) => void;
  setStep: (step: number) => void;
  selectedTrainerRole: 'owner' | 'trainer' | null;
  setSelectedTrainerRole: (role: 'owner' | 'trainer') => void;
}

const StepTrainer = ({
  step,
  formData,
  setFormData,
  setStep,
  selectedTrainerRole,
  setSelectedTrainerRole,
}: StepTrainerProps) => {
  const handleSelectRole = (role: 'owner' | 'trainer') => {
    setSelectedTrainerRole(role);
    setStep(2);
  };

  return (
    <>
      <TrainerTemplate
        selectedTrainerRole={selectedTrainerRole}
        setSelectedTrainerRole={handleSelectRole} // 역할 선택 시 step 증가
      />

      {selectedTrainerRole === 'owner' && step === 2 && (
        <OwnerLoginForm
          formData={formData}
          setFormData={setFormData}
          setStep={setStep}
        />
      )}
      {selectedTrainerRole === 'trainer' && step === 2 && (
        <TrainerLoginForm
          formData={formData}
          setFormData={setFormData}
          setStep={setStep}
        />
      )}
    </>
  );
};

export default StepTrainer;
