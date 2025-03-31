'use client';

import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface AddressSearchModalProps {
  onClose: () => void;
  onSelect: (address: string) => void;
}

const AddressSearchModal: React.FC<AddressSearchModalProps> = ({
  onClose,
  onSelect,
}) => {
  const handleComplete = (data: any) => {
    // data 객체에서 주소 정보 추출
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.bname && /[동|로|가]$/g.test(data.bname)) {
      extraAddress += data.bname;
    }
    if (data.buildingName && data.apartment === 'Y') {
      extraAddress += extraAddress
        ? `, ${data.buildingName}`
        : data.buildingName;
    }
    if (extraAddress) {
      fullAddress += ` (${extraAddress})`;
    }

    onSelect(fullAddress);
  };

  return (
    <div className="fixed inset-0 bg-mono_500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-mono_200 p-6 rounded shadow-lg w-[600px] h-[600px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">주소를 검색해주세요.</h2>
          <button onClick={onClose}>
            <XMarkIcon className="w-[25px] h-[25px] text-mono_400 cursor-pointer" />
          </button>
        </div>
        <DaumPostcode onComplete={handleComplete} />
      </div>
    </div>
  );
};

export default AddressSearchModal;
