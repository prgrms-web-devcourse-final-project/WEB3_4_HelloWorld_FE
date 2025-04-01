'use client';

import CustomButton from '@/app/login/components/CustomButton';
import InputField from '@/app/login/components/InputField';
import GenderSelector from '@/components/atoms/GenderSelector';
import BankSelect from '@/app/login/components/BankSelect';
import OpenDateInputGroup from '@/components/molecules/OpenDateInputGroup';
import { useState } from 'react';
import ReturnHomeMessage from '@/app/login/components/HomeLink/HomeReturnMsg';

interface OwnerLoginFormProps {
  formData: Record<string, any>;
  setFormData: (data: Record<string, any>) => void;
  setStep: (step: number) => void;
}

const OwnerLoginForm = ({
  formData,
  setFormData,
  setStep,
}: OwnerLoginFormProps) => {
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [openDate, setOpenDate] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataObj = new FormData(e.currentTarget);
    const result = Object.fromEntries(formDataObj.entries());

    const finalData = {
      ...result,
      gender: selectedGender,
      bank: selectedBank,
      openDate,
    };

    console.log('사장님 전송 데이터:', finalData);
    setFormData(finalData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-[452px] flex flex-col mt-[-40px]">
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

        <GenderSelector
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
          marginBottom="60px"
        />

        <div className="flex gap-[62px] mb-[60px]">
          <div style={{ width: '150px' }}>
            <BankSelect
              selectedBank={selectedBank}
              setSelectedBank={setSelectedBank}
              required
              width="150px"
              height="32px"
            />
          </div>

          <div style={{ width: '237px' }}>
            <InputField
              label="계좌번호"
              name="account"
              placeholder="000-0000-0000-00"
              required
              width="237px"
              height="62px"
              containerMarginBottom="0"
              labelInputGap="5px"
            />
          </div>
        </div>

        <OpenDateInputGroup onDateChange={setOpenDate} />

        <InputField
          label="사업자번호"
          name="businessNumber"
          placeholder="12-123-1234-1231245"
          required
          width="452px"
          height="62px"
          containerMarginBottom="60px"
          labelInputGap="5px"
        />

        <CustomButton type="submit" className="bg-main text-mono_100 mb-[20px]">
          가입 완료
        </CustomButton>
      </div>
      <ReturnHomeMessage />
    </form>
  );
};

export default OwnerLoginForm;
