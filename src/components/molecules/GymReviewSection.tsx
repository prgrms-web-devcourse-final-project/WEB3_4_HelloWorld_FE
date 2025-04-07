'use client';

import { useState } from 'react';

import GymReviewCard from './GymReviewCard';

interface Review {
  id: string;
  nickname: string;
  date: string;
  rating: number;
  images: string[];
  content: string;
  profileImage: string;
}

interface GymReviewSectionProps {
  reviews: Review[];
  fullView?: boolean; // review 탭에서 전체 보기용
}

export default function GymReviewSection({
  reviews,
  fullView = false,
}: GymReviewSectionProps) {
  const [expanded, setExpanded] = useState(false);

  const reviewsToShow = fullView || expanded ? reviews : reviews.slice(0, 2);

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-[16px] font-semibold font-pretendard text-mono_800">
        생생한 후기
      </h4>

      <div className="flex flex-col gap-4">
        {reviewsToShow.map((review) => (
          <GymReviewCard key={review.id} {...review} />
        ))}
      </div>

      {/* 홈탭에서만 더보기 버튼 */}
      {!fullView && reviews.length > 2 && (
        <button
          className="w-full h-[32px] bg-mono_100 hover:bg-mono_300 flex justify-center items-center rounded-md transition"
          onClick={() => setExpanded((prev) => !prev)}
        >
          <span className="text-sm text-mono_500">
            {expanded ? '접기' : '더보기'}
          </span>
        </button>
      )}
    </div>
  );
}
