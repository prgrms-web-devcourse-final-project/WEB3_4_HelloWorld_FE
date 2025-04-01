import { useState } from 'react';

import InputField from '@/app/login/components/InputField';
import BirthdayInputGroup from '@/components/molecules/BirthdayInputGroup';
import CustomButton from '@/app/login/components/CustomButton';
import ReturnHomeMessage from '@/app/login/components/HomeLink/HomeReturnMsg';
interface Step1FormProps {
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function Step1Form({ setFormData, setStep }: Step1FormProps) {
  const [birth, setBirth] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const result = Object.fromEntries(data.entries());

    if (!birth) {
      alert('모든 필드 선택해주세요.');
    }
    setFormData({ ...result, birth });
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
