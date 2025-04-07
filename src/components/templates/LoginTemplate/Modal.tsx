'use client';

import { useState, useMemo } from 'react';
import { Image, Input } from '@heroui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

import Modal from '@/components/atoms/Modal';
import { GymType } from '@/types/gym';
interface GymDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  gyms: GymType[];
  onSelect: (name: string) => void;
}

export default function GymDetailModal({
  isOpen,
  onClose,
  gyms,
  onSelect,
}: GymDetailModalProps) {
  const [keyword, setKeyword] = useState('');

  const filteredGyms = useMemo(
    () =>
      gyms.filter((gym) =>
        gym.gymName.toLowerCase().includes(keyword.toLowerCase()),
      ),
    [keyword, gyms],
  );

  return (
    <Modal isOpen={isOpen} size="xl" onOpenChange={onClose}>
      <div className="max-h-[600px] overflow-y-auto p-6 space-y-4">
        {/* 제목 + 검색바 */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">헬스장 정보</h2>
          <div className="relative w-[280px]">
            <Input
              className="pl-10 pr-4 py-2 rounded-xl bg-mono_100 border-none text-sm text-mono_500 placeholder:text-mono_400 shadow-none"
              placeholder="헬스장 검색"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-mono_400 w-5 h-5" />
          </div>
        </div>

        {/* 필터링된 헬스장 리스트 */}
        {filteredGyms.length > 0 ? (
          filteredGyms.map((gym) => (
            <button
              key={gym.gymName}
              className="flex justify-between items-center border rounded-lg p-4 bg-white shadow-sm w-full text-left"
              type="button"
              onClick={() => {
                onSelect(gym.gymName);
                onClose();
              }}
            >
              <div className="flex flex-col space-y-1">
                <p className="text-lg font-semibold">{gym.gymName}</p>
                <p className="text-sm text-mono_400">📍 {gym.address}</p>
              </div>
              <Image
                alt={`${gym.gymName} 이미지`}
                className="rounded-md object-cover ml-4"
                height={100}
                src={gym.imageUrl}
                width={160}
              />
            </button>
          ))
        ) : (
          <p className="text-center text-mono_400 pt-10">
            검색 결과가 없습니다.
          </p>
        )}
      </div>
    </Modal>
  );
}
