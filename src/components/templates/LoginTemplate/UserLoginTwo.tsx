'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import MeasurementInputs from '@/components/molecules/MeasurementInput';
import AddressInput from '@/components/molecules/AddressInput';
import ExerciseInputs from '@/components/molecules/ExerciseInputs';
import CustomButton from '@/app/(main)/login/components/CustomButton';
import GenderSelector from '@/components/atoms/GenderSelector';
import ReturnHomeMessage from '@/app/(main)/login/components/HomeLink/HomeReturnMsg';
import { registerUser } from '@/apis/userApi';
import { UserData } from '@/types/UserData';
import { mapGenderToApi } from '@/utils/formatUtils';
import useToast from '@/hooks/useToast';

interface UserInfoFormProps {
  setFormData: React.Dispatch<React.SetStateAction<UserData>>;
  formData: UserData;
}

const UserInfoForm = ({ setFormData, formData }: UserInfoFormProps) => {
  const [selectedGender, setSelectedGender] = useState<string>('남성');
  const [address, setAddress] = useState<string>('');
  const [exerciseData, setExerciseData] = useState({
    recentBench: 0,
    recentSquat: 0,
    recentDeadlift: 0,
  });

  const router = useRouter();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const result = Object.fromEntries(data.entries());

    const finalFormData: UserData = {
      ...formData,
      gender: mapGenderToApi(selectedGender),
      height: result.height?.toString() || '',
      weight: result.weight?.toString() || '',
      address: address || '서울시 강남구 테헤란로 14길 6',
      recentBench: exerciseData.recentBench || 0,
      recentSquat: exerciseData.recentSquat || 0,
      recentDeadlift: exerciseData.recentDeadlift || 0,
    };

    setFormData(finalFormData);

    try {
      await registerUser(finalFormData);

      showToast({
        title: '회원가입 완료',
        description: '정상적으로 가입되었습니다.',
        lazy: true,
      });

      router.push('/');
    } catch {
      showToast({
        title: '회원가입 실패',
        description: '다시 시도해주세요.',
        type: 'danger',
        lazy: true,
      });
    }
  };

  return (
    <form
      className="flex flex-col items-center w-full mt-[25px]"
      onSubmit={handleSubmit}
    >
      <GenderSelector
        marginBottom="50px"
        selectedGender={selectedGender}
        setSelectedGender={setSelectedGender}
      />
      <MeasurementInputs formData={formData} setFormData={setFormData} />
      <AddressInput setAddress={setAddress} />
      <ExerciseInputs setExerciseData={setExerciseData} />
      <div>
        <CustomButton
          className="mb-[20px]"
          height="48px"
          type="submit"
          width="452px"
        >
          완료하기
        </CustomButton>
      </div>
      <ReturnHomeMessage />
    </form>
  );
};

export default UserInfoForm;
