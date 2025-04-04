'use client';

import Image from 'next/image';
interface LevelBadgeProps {
  level: 0 | 1 | 2 | 3 | 4;
}

const LEVEL_COLORS: Record<LevelBadgeProps['level'], string> = {
  0: 'bg-[#828282]',
  1: 'bg-[#35AC1d]',
  2: 'bg-[#F5A524]',
  3: 'bg-[#FEE500]',
  4: 'bg-main',
};

const LEVEL_ICON_PATHS: Record<LevelBadgeProps['level'], string | null> = {
  0: null,
  1: null,
  2: '/assets/icons/dumbeltwo.svg',
  3: '/assets/icons/dumbel.svg',
  4: '/assets/icons/crown.svg',
};

const LevelBadge = ({ level }: LevelBadgeProps) => (
  <div
    className={`relative w-[44px] h-[22px] rounded-[8px] text-[#fff] text-[11px] font-bold flex items-center justify-center ${LEVEL_COLORS[level]}`}
  >
    {LEVEL_ICON_PATHS[level] && (
      <Image
        alt={`level-${level}-icon`}
        className="absolute left-[-2px] top-[-8px]"
        height={11}
        src={LEVEL_ICON_PATHS[level] as string}
        width={12}
      />
    )}
    <span>Lv.{level}</span>
  </div>
);

export default LevelBadge;

// 사용방법 예시
// import LevelBadge from '@/components/atoms/LevelBadge';

// // level ===  0 ~ 4 까지
// <LevelBadge level={3} />
