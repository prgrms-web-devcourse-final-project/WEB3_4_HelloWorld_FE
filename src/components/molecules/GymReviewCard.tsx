'use client';

import { useState } from 'react';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';

import ModalImageGallery from '@/components/molecules/ModalImageGallery';

interface GymReviewCardProps {
  nickname: string;
  date: string;
  rating: number;
  profileImage: string;
  images: string[];
  content: string;
}

export default function GymReviewCard({
  nickname,
  date,
  rating,
  profileImage,
  images,
  content,
}: GymReviewCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const displayImages = images.slice(0, 5);
  const showOverlay = images.length > 5;

  return (
    <div className="w-full p-5 rounded-xl border border-mono_100 shadow-sm bg-white flex flex-col gap-4">
      {/* 상단 - 유저 정보 */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 relative rounded-full overflow-hidden flex-shrink-0">
            <Image
              fill
              alt="profile"
              className="object-cover"
              src={profileImage}
            />
          </div>
          <span className="text-[16px] font-medium text-mono_900">
            {nickname}
          </span>
          <span className="text-[12px] text-mono_500">{date}</span>
        </div>
        <div className="flex gap-[2px]">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon
              key={i}
              className={`w-4 h-4 ${
                i < Math.round(rating) ? 'text-yellow-400' : 'text-mono_200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 이미지 리스트 */}
      <div className="flex gap-3">
        {displayImages.map((img, idx) => (
          <div
            key={idx}
            className="relative w-16 h-16 rounded-lg overflow-hidden cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={() => setIsModalOpen(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setIsModalOpen(true);
              }
            }}
          >
            <Image
              fill
              alt={`review-${idx}`}
              className={`object-cover ${showOverlay && idx === 4 ? 'blur-[2px]' : ''}`}
              src={img}
            />
            {showOverlay && idx === 4 && (
              <span className="absolute inset-0 flex items-center justify-center text-white text-sm font-semibold">
                +{images.length - 4}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* 후기 텍스트 */}
      <p className="text-[16px] text-mono_800 font-pretendard line-clamp-3 leading-relaxed">
        {content}
      </p>

      {/* 모달 갤러리 */}
      <ModalImageGallery
        imageList={images}
        isOpen={isModalOpen}
        onOpenChange={() => setIsModalOpen(false)}
      />
    </div>
  );
}
