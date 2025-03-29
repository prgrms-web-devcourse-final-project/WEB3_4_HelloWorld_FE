import { useState } from 'react';
import InputField from '@/app/login/components/InputField';
import BirthdayInputGroup from '@/components/molecules/BirthdayInputGroup';
import CustomButton from '@/app/login/components/CustomButton';

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
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
      <InputField
        label="이름"
        name="name"
        placeholder="이름을 입력해주세요."
        required
        width="452px"
        height="62px"
        containerMarginBottom="60px"
        labelInputGap="5px"
      />
      <InputField
        label="전화번호"
        name="phone"
        placeholder="010-0000-0000"
        required
        width="452px"
        height="62px"
        containerMarginBottom="60px"
        labelInputGap="5px"
      />
      <InputField
        label="이메일"
        name="email"
        placeholder="ghdrlfehd123@naver.com"
        type="email"
        required
        width="452px"
        height="62px"
        containerMarginBottom="60px"
        labelInputGap="5px"
      />

      <BirthdayInputGroup onBirthChange={setBirth} />

      <CustomButton type="submit" width="452px" height="48px">
        다음으로
      </CustomButton>
    </form>
  );
}
