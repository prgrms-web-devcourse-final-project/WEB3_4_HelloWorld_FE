'use client';

import { formatDate } from '@/utils/formatUtils';
import InputField from '@/app/login/components/InputField';
import BirthdayInputGroup from '@/components/molecules/BirthdayInputGroup';
import CustomButton from '@/app/login/components/CustomButton';
import ReturnHomeMessage from '@/app/login/components/HomeLink/HomeReturnMsg';
import { UserData } from '@/types/UserData';

interface Step1FormProps {
  birth: string;
  setBirth: (val: string) => void;
  setFormData: React.Dispatch<React.SetStateAction<UserData>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function Step1Form({
  birth,
  setBirth,
  setFormData,
  setStep,
}: Step1FormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const result = Object.fromEntries(data.entries());

    if (!birth) {
      alert('모든 필드를 입력해주세요.');

      return;
    }

    const formattedBirth = formatDate(birth); // → 'YYYY.MM.DD'

    setFormData({
      phoneNumber: result.phone as string,
      memberName: result.name as string,
      email: result.email as string,
      birthday: formattedBirth,
      gender: '',
      height: '',
      weight: '',
      address: '',
      recentBench: 0,
      recentSquat: 0,
      recentDeadlift: 0,
    });

    setStep(2);
  };

  return (
    <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
      <InputField
        required
        containerMarginBottom="60px"
        height="62px"
        label="이름"
        labelInputGap="5px"
        name="name"
        placeholder="이름을 입력해주세요."
        width="452px"
      />
      <InputField
        required
        containerMarginBottom="60px"
        height="62px"
        label="전화번호"
        labelInputGap="5px"
        name="phone"
        placeholder="010-0000-0000"
        width="452px"
      />
      <InputField
        required
        containerMarginBottom="60px"
        height="62px"
        label="이메일"
        labelInputGap="5px"
        name="email"
        placeholder="ghdrlfehd123@naver.com"
        type="email"
        width="452px"
      />

      <BirthdayInputGroup onBirthChange={setBirth} />

      <CustomButton
        className="mb-[20px]"
        height="48px"
        type="submit"
        width="452px"
      >
        다음으로
      </CustomButton>
      <ReturnHomeMessage />
    </form>
  );
}
