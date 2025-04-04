'use client';

import Step1Form from '@/components/templates/LoginTemplate/UserLoginOne';
import Step2Form from '@/components/templates/LoginTemplate/UserLoginTwo';

interface StepUserProps {
  step: number;
  formData: Record<string, any>;
  setFormData: (data: Record<string, any>) => void;
  setStep: (step: number) => void;
  birth: string;
  setBirth: (val: string) => void;
}

const StepUser = ({
  step,
  formData,
  setFormData,
  setStep,
  birth,
  setBirth,
}: StepUserProps) =>
  step === 1 ? (
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
  );

export default StepUser;
