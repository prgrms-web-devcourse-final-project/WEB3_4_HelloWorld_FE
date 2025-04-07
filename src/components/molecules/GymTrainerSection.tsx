'use client';

import { useState } from 'react';

import GymTrainerCard from './GymTrainerCard';

export interface Trainer {
  name: string;
  description: string;
  price: string;
  specialty: string;
  career: string;
  awards: string;
  image: string;
}

interface GymTrainerSectionProps {
  trainers: Trainer[];
  fullView?: boolean; // instructors 탭에서 true
}

export default function GymTrainerSection({
  trainers,
  fullView = false,
}: GymTrainerSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const trainersToShow = fullView || expanded ? trainers : trainers.slice(0, 2);

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-[16px] font-semibold font-pretendard text-mono_800">
        PT 강사
      </h4>

      <div className="flex flex-col gap-4">
        {trainersToShow.map((trainer) => (
          <GymTrainerCard key={trainer.name} {...trainer} />
        ))}
      </div>

      {/* 홈탭에서만 더보기 버튼 보여줌 */}
      {!fullView && trainers.length > 2 && (
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
