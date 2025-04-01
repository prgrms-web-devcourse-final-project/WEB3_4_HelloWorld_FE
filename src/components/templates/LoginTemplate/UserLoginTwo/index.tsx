'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import MeasurementInputs from '@/components/molecules/MeasurementInput';
import AddressInput from '@/components/molecules/AddressInput';
import ExerciseInputs from '@/components/molecules/ExerciseInputs';
import CustomButton from '@/app/login/components/CustomButton';
import GenderSelector from '@/components/atoms/GenderSelector';
import ReturnHomeMessage from '@/app/login/components/HomeLink/HomeReturnMsg';
import { registerUser } from '@/apis/userApi';
import { UserData } from '@/types/UserData';
import { mapGenderToApi } from '@/utils/formatUtils';

interface UserInfoFormProps {
  setFormData: React.Dispatch<React.SetStateAction<UserData>>;
  formData: UserData;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const UserInfoForm = ({
  setFormData,
  formData,
  setStep,
}: UserInfoFormProps) => {
  const [selectedGender, setSelectedGender] = useState<string>('남성');
  const [address, setAddress] = useState<string>('');
  const [exerciseData, setExerciseData] = useState<{
    recentBench: number;
    recentSquat: number;
    recentDeadlift: number;
  }>({
    recentBench: 0,
    recentSquat: 0,
    recentDeadlift: 0,
  });

  const router = useRouter(); // 페이지 전환을 위한 router

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const result = Object.fromEntries(data.entries());

    result.gender = selectedGender;

    // 최종 폼 데이터 구성
    const finalFormData: UserData = {
      ...formData,
      ...result,
      gender: mapGenderToApi(selectedGender),
      address: address || '서울시 강남구 테헤란로 14길 6', // 기본 주소 설정
      recentBench: exerciseData.recentBench || 0,
      recentSquat: exerciseData.recentSquat || 0,
      recentDeadlift: exerciseData.recentDeadlift || 0,
    };

    console.log('제출 데이터:', finalFormData);

    setFormData(finalFormData);

    // API 호출로 데이터 전송
    try {
      await registerUser(finalFormData);
      alert('회원가입이 완료되었습니다.');
      router.push('/');
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
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
      <ExerciseInputs setExerciseData={setExerciseData} />{' '}
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
