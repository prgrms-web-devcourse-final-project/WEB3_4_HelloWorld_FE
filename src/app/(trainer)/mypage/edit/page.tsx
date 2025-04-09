'use client';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

import BankSelect from '@/app/(main)/login/components/BankSelect';
import CustomButton from '@/app/(main)/login/components/CustomButton';
import ReturnHomeMessage from '@/app/(main)/login/components/HomeLink/HomeReturnMsg';
import InputField from '@/app/(main)/login/components/InputField';
import GenderSelector from '@/components/atoms/GenderSelector';
import GymDetailModal from '@/components/templates/LoginTemplate/Modal';
import PtCardSection from '@/components/molecules/PT/PtCardSection';

export default function MyPageEdit() {
  return (
    <PtCardSection>
      <form className="">
        <div className="flex flex-col">
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
            selectedGender={''}
            setSelectedGender={function (gender: string): void {
              throw new Error('Function not implemented.');
            }}
          />

          <div className="flex gap-[62px] mb-[60px]">
            <div style={{ width: '150px' }}>
              <BankSelect
                required
                height="32px"
                selectedBank={''}
                setSelectedBank={function (bank: string): void {
                  throw new Error('Function not implemented.');
                }}
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

          <div className="relative mb-[60px]">
            <InputField
              required
              containerMarginBottom="0"
              height="62px"
              label="소속 헬스장"
              labelInputGap="5px"
              name="gym"
              placeholder="소속된 헬스장을 검색해주세요."
              width="452px"
            />
            <MagnifyingGlassIcon className="w-[25px] h-[25px] absolute right-3 top-[35px] text-mono_400 cursor-pointer" />
          </div>
          <GymDetailModal
            gyms={[]}
            isOpen={false}
            onClose={() => console.log('close')}
            onSelect={() => console.log('select')}
          />

          <CustomButton
            className="bg-main text-mono_100 mb-[20px]"
            type="submit"
          >
            정보 수정
          </CustomButton>
        </div>
        <ReturnHomeMessage />
      </form>
    </PtCardSection>
  );
}
