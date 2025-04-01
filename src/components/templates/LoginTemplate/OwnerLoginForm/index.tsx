'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import CustomButton from '@/app/login/components/CustomButton';
import InputField from '@/app/login/components/InputField';
import GenderSelector from '@/components/atoms/GenderSelector';
import BankSelect from '@/app/login/components/BankSelect';
import OpenDateInputGroup from '@/components/molecules/OpenDateInputGroup';
import ReturnHomeMessage from '@/app/login/components/HomeLink/HomeReturnMsg';
import { formatDate, mapGenderToApi } from '@/utils/formatUtils';
import { registerOwner } from '@/apis/trainerApi';
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
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataObj = new FormData(e.currentTarget);
    const result = Object.fromEntries(formDataObj.entries());

    const finalData = {
      trainerName: result.name as string,
      phoneNumber: result.phone as string,
      email: result.email as string,
      gender: mapGenderToApi(selectedGender) as string,
      bank: selectedBank as string,
      account: result.account as string,
      businessNumber: result.businessNumber as string,
      date: formatDate(openDate) as string,
    };

    console.log('사장님 전송 데이터:', finalData);

    try {
      await registerOwner(finalData);
      alert('회원가입이 완료되었습니다.');
      router.push('/');
    } catch (error) {
      console.error('등록 실패:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-[452px] flex flex-col mt-[-40px]">
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

        <GenderSelector
          marginBottom="60px"
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
        />

        <div className="flex gap-[62px] mb-[60px]">
          <div style={{ width: '150px' }}>
            <BankSelect
              required
              height="32px"
              selectedBank={selectedBank}
              setSelectedBank={setSelectedBank}
              width="150px"
            />
          </div>

          <div style={{ width: '237px' }}>
            <InputField
              required
              containerMarginBottom="0"
              height="62px"
              label="계좌번호"
              labelInputGap="5px"
              name="account"
              placeholder="000-0000-0000-00"
              width="237px"
            />
          </div>
        </div>

        <OpenDateInputGroup onDateChange={setOpenDate} />

        <InputField
          required
          containerMarginBottom="60px"
          height="62px"
          label="사업자번호"
          labelInputGap="5px"
          name="businessNumber"
          placeholder="12-123-1234-1231245"
          width="452px"
        />

        <CustomButton className="bg-main text-mono_100 mb-[20px]" type="submit">
          가입 완료
        </CustomButton>
      </div>
      <ReturnHomeMessage />
    </form>
  );
};

export default OwnerLoginForm;
