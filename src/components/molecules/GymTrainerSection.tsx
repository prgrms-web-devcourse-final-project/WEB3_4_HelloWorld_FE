// components/molecules/GymTrainerSection.tsx

'use client';

import { useState } from 'react';

import GymTrainerCard from './GymTrainerCard';

interface Trainer {
  name: string;
  description: string;
  price: string;
  specialty: string;
  career: string;
  awards: string;
  image: string;
}

const dummyTrainers: Trainer[] = [
  {
    name: '남궁혁',
    description:
      '재밌게 운동하는 법을 가르칩니다! 최고보다는 최선을, 포기보다는 실패를',
    price: '30,000',
    specialty: '바디프로필, 다이어트',
    career: '6년 이상',
    awards: '전국 피트니스 대회 1위',
    image: '/gym/trainers/trainer1.jpg',
  },
  {
    name: '이지은',
    description: '회원님 맞춤 운동 루틴으로 건강하게!',
    price: '35,000',
    specialty: '체형 교정, 재활',
    career: '8년 이상',
    awards: '대한트레이너협회 인증',
    image: '/gym/trainers/trainer2.jpg',
  },
  {
    name: '박철민',
    description: '꾸준함은 배신하지 않습니다.',
    price: '25,000',
    specialty: '헬스 입문, 근육증가',
    career: '4년',
    awards: '-',
    image: '/gym/trainers/trainer3.jpg',
  },
];

export default function GymTrainerSection() {
  const [expanded, setExpanded] = useState(false);

  const trainersToShow = expanded ? dummyTrainers : dummyTrainers.slice(0, 2);

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

      {/* 더보기 버튼 */}
      {dummyTrainers.length > 2 && (
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
