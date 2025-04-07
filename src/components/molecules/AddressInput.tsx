'use client';

import React, { useState, ChangeEvent } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import InputField from '@/app/(main)/login/components/InputField';
import AddressSearchModal from '@/components/molecules/AddressSearchModal';

interface AddressInputProps {
  setAddress: (value: string) => void;
  value?: string;
}

const AddressInput = ({ setAddress }: AddressInputProps) => {
  const [address, setLocalAddress] = useState(''); // 내부 주소 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기 함수
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // 모달에서 주소 선택 시
  const handleAddressSelect = (selectedAddress: string) => {
    setLocalAddress(selectedAddress); // 선택한 주소를 로컬 상태에 저장
    setAddress(selectedAddress); // 부모 컴포넌트에 주소 전달
    setIsModalOpen(false);
  };

  // 직접 입력 시
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalAddress(e.target.value);
    setAddress(e.target.value); // 부모 컴포넌트에 주소 전달
  };

  return (
    <div className="relative">
      <button
        aria-label="주소 검색"
        className="w-full"
        type="button"
        onClick={handleOpenModal}
      >
        <InputField
          readOnly
          containerMarginBottom="60px"
          height="40px"
          label="도로명 주소"
          labelInputGap="8px"
          name="address"
          placeholder="예: 서울시 강남구 ..."
          required={true}
          type="text"
          value={address}
          width="452px"
          onChange={handleInputChange}
        />
      </button>
      <MagnifyingGlassIcon
        className="w-[25px] h-[25px] absolute right-3 top-[35px] text-mono_400 cursor-pointer"
        onClick={handleOpenModal}
      />
      {isModalOpen && (
        <AddressSearchModal
          onClose={() => setIsModalOpen(false)}
          onSelect={handleAddressSelect}
        />
      )}
    </div>
  );
};

export default AddressInput;
