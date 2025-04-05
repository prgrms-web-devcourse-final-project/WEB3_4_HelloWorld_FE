'use client';

import { Dispatch, SetStateAction } from 'react';

import Step1Form from '@/components/templates/LoginTemplate/UserLoginOne';
import Step2Form from '@/components/templates/LoginTemplate/UserLoginTwo';
import { UserData } from '@/types/UserData';

interface StepUserProps {
  step: number;
  formData: UserData;
  setFormData: Dispatch<SetStateAction<UserData>>;
  setStep: Dispatch<SetStateAction<number>>;
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
    <Step2Form formData={formData} setFormData={setFormData} />
  );

export default StepUser;
