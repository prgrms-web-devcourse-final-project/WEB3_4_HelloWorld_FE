'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import CustomButton from '@/app/(main)/login/components/CustomButton';
import InputField from '@/app/(main)/login/components/InputField';
import GenderSelector from '@/components/atoms/GenderSelector';
import BankSelect from '@/app/(main)/login/components/BankSelect';
import OpenDateInputGroup from '@/components/molecules/OpenDateInputGroup';
import ReturnHomeMessage from '@/app/(main)/login/components/HomeLink/HomeReturnMsg';
import { formatDate, mapGenderToApi } from '@/utils/formatUtils';
import { registerOwner } from '@/apis/trainerApi';
import useToast from '@/hooks/useToast';

const OwnerLoginForm = () => {
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [openDate, setOpenDate] = useState('');
  const router = useRouter();
  const { showToast } = useToast();

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
      businessDate: formatDate(openDate) as string,
    };

    try {
      await registerOwner(finalData);

      showToast({
        title: '회원가입 완료',
        description: '정상적으로 가입되었습니다.',
        lazy: true,
      });

      router.push('/');
    } catch {
      showToast({
        title: '회원가입 실패',
        description: '잘못된 정보를 입력하셨습니다.',
        type: 'danger',
        lazy: true,
      });
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
