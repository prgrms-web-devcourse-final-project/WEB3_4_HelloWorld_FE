'use client';
import { Image, useDisclosure } from '@heroui/react';

import Star from '../StarGroup';
import ModalImageGallery from '../ModalImageGallery';

import LevelBadge from '@/components/atoms/LevelBadge';

type ReviewItemProps = {
  level?: number;
  name?: string;
  date?: string;
  score: number;
  content: string;
  imageUrls: any[];
};

export default function PtReviewItem({
  content,
  score,
  imageUrls,
}: ReviewItemProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex gap-4 flex-col">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <LevelBadge level={1} />
          <p className="text-mono_600 text-lg font-semibold">마동석</p>
          <span className="text-mono_400 text-sm">2025.04.03</span>
        </div>
        <div>
          <Star h={'h-4'} rate={score} readonly={true} w={'h-4'} />
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <span className="text-mono_600 text-sm">{content}</span>
        </div>
        <div className=" w-full max-w-20 gap-1 grid grid-rows-2 grid-cols-2">
          {imageUrls?.map((image: any, index: number) => (
            <div key={index} className={` w-full h-full relative`}>
              <Image
                className="w-full aspect-square h-full object-cover"
                loading="lazy"
                src={image.imageUrl}
              />

              {index === 3 && (
                <div className="absolute cursor-pointer rounded-medium hover:bg-stone-700 transition-all duration-300 inset-0 z-50 left-0 top-0 w-full h-full bg-black/50 flex justify-center items-center">
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
