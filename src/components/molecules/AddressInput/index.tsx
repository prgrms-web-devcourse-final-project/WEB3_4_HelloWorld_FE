'use client';

import React, { useState, ChangeEvent } from 'react';
import InputField from '@/app/login/components/InputField';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import AddressSearchModal from '@/components/molecules/AddressSearchModal/AddressSearchModal';

const AddressInput = () => {
  const [address, setAddress] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기 함수
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // 모달에서 주소 선택 시
  const handleAddressSelect = (selectedAddress: string) => {
    setAddress(selectedAddress);
    setIsModalOpen(false);
  };

  // 직접 입력 시 (원한다면 readOnly 없이도 가능)
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleOpenModal}
        aria-label="주소 검색"
        className="w-full"
      >
        <InputField
          label="도로명 주소"
          name="address"
          placeholder="예: 서울시 강남구 ..."
          required={true}
          width="452px"
          height="40px"
          containerMarginBottom="60px"
          labelInputGap="8px"
          value={address}
          onChange={handleInputChange}
          readOnly
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
