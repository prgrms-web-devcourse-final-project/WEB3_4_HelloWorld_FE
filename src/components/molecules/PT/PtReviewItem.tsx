'use client';
import { Avatar, Image, useDisclosure } from '@heroui/react';

import Star from '../StarGroup';
import ModalImageGallery from '../ModalImageGallery';

import LevelBadge from '@/components/atoms/LevelBadge';
import { getTimeAgo } from '@/utils/dateUtils';

type ReviewItemProps = {
  level?: number;
  name?: string;
  date?: string;
  score: number;
  content: string;
  imageUrls: any[];
  memberName: string;
  memberLevel: number;
  memerProfileUrl: string;
  createAt: string;
};

export default function PtReviewItem({
  content,
  score,
  imageUrls,
  memberName,
  memberLevel,
  memerProfileUrl,
  createAt,
}: ReviewItemProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex gap-4 flex-col">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Avatar
            className="object-cover aspect-square"
            size="sm"
            src={memerProfileUrl}
          />

          <p className="text-mono_600 text-lg font-semibold">{memberName}</p>
          <LevelBadge level={(memberLevel || 0) as 0 | 1 | 2 | 3 | 4} />
          <span className="text-mono_400 text-sm">{getTimeAgo(createAt)}</span>
        </div>
        <div>
          <Star h={'h-4'} rate={score} readonly={true} w={'h-4'} />
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <span className="text-mono_600 text-sm">{content}</span>
        </div>
        <div className="w-full max-w-20 gap-1 grid grid-rows-2 grid-cols-2">
          {imageUrls?.map((image: any, index: number) => (
            <div key={index} className="w-full h-full relative">
              <Image
                alt=""
                className="w-full aspect-square h-full object-cover"
                loading="lazy"
                src={image.imageUrl}
              />
              {index === 3 && (
                <div className="absolute cursor-pointer rounded-medium hover:bg-stone-700 transition-all duration-300 inset-0 z-50 bg-black/50 flex justify-center items-center">
                  <button
                    className="text-white w-full h-full text-2xl font-bold"
                    onClick={onOpen}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* 👇 빈 칸 채우기 (최대 4칸까지) */}
          {Array.from({ length: 4 - imageUrls.length }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="w-full aspect-square bg-transparent rounded"
            />
          ))}
        </div>
      </div>
      <ModalImageGallery
        imageList={imageUrls}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}
