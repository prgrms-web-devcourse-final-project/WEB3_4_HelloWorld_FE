'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import CustomButton from '@/app/(main)/login/components/CustomButton';
import InputField from '@/app/(main)/login/components/InputField';
import GenderSelector from '@/components/atoms/GenderSelector';
import BankSelect from '@/app/(main)/login/components/BankSelect';
import ReturnHomeMessage from '@/app/(main)/login/components/HomeLink/HomeReturnMsg';
import { registerTrainer } from '@/apis/trainerApi';
import { mapGenderToApi } from '@/utils/formatUtils';
import GymDetailModal from '@/components/templates/LoginTemplate/Modal';
import { fetchGymList } from '@/apis/gymApi';
import { GymType } from '@/types/gym';

const TrainerLoginForm = () => {
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [gymName, setGymName] = useState('');
  const [alertTriggered, setAlertTriggered] = useState(false);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gyms, setGyms] = useState<GymType[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (alertTriggered) return;

    const formDataObj = new FormData(e.currentTarget);
    const result = Object.fromEntries(formDataObj.entries());

    const finalData = {
      trainerName: result.name as string,
      phoneNumber: result.phone as string,
      email: result.email as string,
      gender: mapGenderToApi(selectedGender),
      bank: selectedBank,
      account: result.account as string,
      gymName: gymName,
    };

    try {
      await registerTrainer(finalData);
      alert('트레이너 회원가입이 완료되었습니다.');
      setAlertTriggered(true);
      router.push('/');
    } catch {
      alert('등록된 헬스장이 없습니다. 다시 시도해주세요.');
      setAlertTriggered(true);
    }
  };

  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const data = await fetchGymList();

        setGyms(data.content);
      } catch {}
    };

    fetchGyms();
  }, []);

  return (
    <form className="-mt-[40px]" onSubmit={handleSubmit}>
      <div className="w-[452px] flex flex-col">
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

        <div className="relative mb-[60px]">
          <InputField
            required
            containerMarginBottom="0"
            height="62px"
            label="소속 헬스장"
            labelInputGap="5px"
            name="gym"
            placeholder="소속된 헬스장을 검색해주세요."
            value={gymName}
            width="452px"
            onChange={(e) => setGymName(e.target.value)}
          />
          <MagnifyingGlassIcon
            className="w-[25px] h-[25px] absolute right-3 top-[35px] text-mono_400 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
        <GymDetailModal
          gyms={gyms}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelect={(name) => setGymName(name)}
        />

        <CustomButton className="bg-main text-mono_100 mb-[20px]" type="submit">
          가입 완료
        </CustomButton>
      </div>
      <ReturnHomeMessage />
    </form>
  );
};

export default TrainerLoginForm;
