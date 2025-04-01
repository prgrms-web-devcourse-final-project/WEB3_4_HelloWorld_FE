import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@heroui/react';
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
        <NextImage
          alt="img1"
          className="rounded-lg object-cover col-span-2 row-span-2"
          height={192}
          src="/gym_sample.jpg"
          width={220}
        />
        <NextImage
          alt="img2"
          className="rounded-lg object-cover"
          height={96}
          src="/gym_sample.jpg"
          width={220}
        />
        <div className="relative">
          <NextImage
            alt="img3"
            className="rounded-lg object-cover blur-sm brightness-75"
            height={96}
            src="/gym_sample.jpg"
            width={220}
          />
          <button
            className="absolute inset-0 flex items-center justify-center"
            onClick={onOpen}
          >
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
              {[1, 2, 3, 4, 5].map((i) => (
                <NextImage
                  key={i}
                  alt={`more${i}`}
                  className="rounded-lg object-cover"
                  height={150}
                  src="/gym_sample.jpg"
                  width={200}
                />
              ))}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
