'use client';

import Image from 'next/image';
import { UserGroupIcon } from '@heroicons/react/24/solid';

import CustomButton from '@/app/(main)/login/components/CustomButton';
import LevelBadge from '@/components/atoms/LevelBadge';

const PointHeader = () => (
  <section className="w-full max-w-[1440px] px-8 mx-auto mt-[100px]">
    <div className="flex gap-8">
      {/* 좌측 이벤트 배너 */}
      <div className="relative w-[928px] h-[500px] rounded-[30px] overflow-hidden">
        <Image
          fill
          priority
          alt="오픈 기념 할인 이벤트"
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 928px"
          src="/assets/images/pointpagesub.jpg"
        />
        <div className="absolute top-[60px] left-[80px] text-white">
          <p className="text-[32px] font-bold">
            <span className="text-[40px] font-bold font-point">
              Gym<span className="text-main">M</span>ate
            </span>
            <br />
            오픈 기념 할인 이벤트
          </p>
          <p className="mt-3 text-sm">
            어서 구매하고 원하는 목표까지 달성하세요!
          </p>
          <div className="mt-[40px]">
            <CustomButton
              height="40px"
              size="small"
              type="button"
              width="200px"
            >
              자세히 보기
            </CustomButton>
          </div>
        </div>
      </div>

      {/* 우측 이번달 TOP 1 */}
      <div className="relative w-[452px] h-[500px] rounded-[30px] overflow-hidden">
        <Image
          fill
          priority
          alt="이번달 TOP 1"
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 452px"
          src="/assets/images/pointpage.jpg"
        />
        <div className="absolute font-point top-[40px] left-[40px] text-white text-[28px] font-bold">
          이번달 TOP 1
        </div>
        {/* 흰색 박스를 중앙에 배치 */}
        <div className="absolute bottom-[30px] left-1/2 transform -translate-x-1/2 w-[350px] bg-white rounded-[20px] p-6 shadow-md h-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-main text-white text-sm rounded-md font-bold flex items-center gap-1">
              <LevelBadge level={4} />
            </span>
          </div>

          <p className="text-lg font-bold text-black mb-3">
            Gym<span className="text-main">M</span>ate 3대 500 도전권
          </p>

          <ul className="mb-6 text-sm text-gray-500 space-y-4">
            <li className="flex items-center gap-2">
              <UserGroupIcon className="w-5 h-5 text-gray-500" />
              3대 500 달성률 80% 돌파
            </li>
            <li className="flex items-center gap-2">
              <UserGroupIcon className="w-5 h-5 text-gray-500" />
              5000포인트 추가 지급
            </li>
          </ul>

          <div className="mb-5 text-right">
            <p className="text-sm text-gray-500 mb-1">오픈기념 할인가</p>
            <div className="flex justify-end items-baseline gap-2">
              <p className="text-sm text-gray-500 line-through">58,000원</p>
              <p className="text-2xl font-bold text-[#f25267]">50,000원</p>
            </div>
          </div>

          <CustomButton
            className="rounded-xl"
            height="44px"
            size="small"
            type="button"
            width="100%"
          >
            결제하기
          </CustomButton>
        </div>
      </div>
    </div>
  </section>
);

export default PointHeader;
