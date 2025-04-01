import { useState } from 'react';
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/react";
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import NextImage from 'next/image';

interface GymDetailPanelProps {
  gym: any;
  isOpen: boolean;
}

export default function GymDetailPanel({ gym, isOpen }: GymDetailPanelProps) {
  const { isOpen: isModalOpen, onOpen, onOpenChange } = useDisclosure();

  if (!gym) return null;

  return (
    <div
      className="
        absolute top-[64px]
        left-[436px] // 검색바 너비만큼 이동
        h-[calc(100%-64px)]
        w-[440px]
        bg-white
        rounded-tl-2xl rounded-bl-2xl
        shadow-2xl
        z-10
        flex flex-col
        overflow-hidden
      "
    >
      {/* 이미지 영역 */}
      <div className="grid grid-cols-2 grid-rows-2 gap-1 p-3 h-[220px]">
        <NextImage src="/gym_sample.jpg" alt="img1" width={220} height={192} className="rounded-lg object-cover col-span-2 row-span-2" />
        <NextImage src="/gym_sample.jpg" alt="img2" width={220} height={96} className="rounded-lg object-cover" />
        <div className="relative">
          <NextImage src="/gym_sample.jpg" alt="img3" width={220} height={96} className="rounded-lg object-cover blur-sm brightness-75" />
          <button onClick={onOpen} className="absolute inset-0 flex items-center justify-center">
            <EllipsisHorizontalIcon className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* 상세 내용 (임시) */}
      <div className="p-4 space-y-2 overflow-y-auto flex-1">
        <h3 className="font-bold text-lg">{gym.name}</h3>
        <p className="text-sm text-mono_500">{gym.address}</p>
        <p className="text-xs text-mono_400">{gym.description}</p>
      </div>

      {/* 모달 */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>사진 더보기</ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-2 gap-2">
              {[1,2,3,4,5].map(i => (
                <NextImage key={i} src="/gym_sample.jpg" alt={`more${i}`} width={200} height={150} className="rounded-lg object-cover" />
              ))}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
