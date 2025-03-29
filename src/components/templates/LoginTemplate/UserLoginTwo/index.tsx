'use client';

import { useState } from 'react';
import MeasurementInputs from '@/components/molecules/MeasurementInput';
import AddressInput from '@/components/molecules/AddressInput';
import ExerciseInputs from '@/components/molecules/ExerciseInputs';
import CustomButton from '@/app/login/components/CustomButton';
import GenderSelector from '@/components/atoms/GenderSelector';
import ReturnHomeMessage from '@/app/login/components/HomeLink/HomeReturnMsg';
interface UserInfoFormProps {
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  formData: any;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const UserInfoForm = ({
  setFormData,
  formData,
  setStep,
}: UserInfoFormProps) => {
  const [selectedGender, setSelectedGender] = useState('남성');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const result = Object.fromEntries(data.entries());
    result.gender = selectedGender;

    const finalFormData = { ...formData, ...result };

    console.log('제출 데이터 test:', finalFormData);

    setFormData(finalFormData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-full mt-[25px]"
    >
      <GenderSelector
        selectedGender={selectedGender}
        setSelectedGender={setSelectedGender}
        marginBottom="50px"
      />
      <MeasurementInputs />
      <AddressInput />
      <ExerciseInputs />

      <div>
        <CustomButton
          type="submit"
          width="452px"
          height="48px"
          className="mb-[20px]"
        >
          완료하기
        </CustomButton>
      </div>
      <ReturnHomeMessage />
    </form>
  );
};

export default UserInfoForm;
