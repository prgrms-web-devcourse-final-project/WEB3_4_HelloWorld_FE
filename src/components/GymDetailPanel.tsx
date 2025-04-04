import { useState } from 'react';
import NextImage from 'next/image';
import { Button } from '@heroui/react';
import {
  HeartIcon as HeartOutline,
  MapIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

import ModalImageGallery from './molecules/ModalImageGallery';
import GymTabs from './molecules/GymTabs';
import GymIntroSection from './molecules/GymIntroSection';
import GymTimeFeeSection from './molecules/GymTimeFeeSection';
import SelectedFacilitySection from './molecules/SelectedFacilitySection';
import EquipmentSection from './molecules/EquipmentSection';
import GymTrainerSection from './molecules/GymTrainerSection';

interface GymDetailPanelProps {
  gym: any;
  onClose: () => void;
}

const allFacilities = [
  '수건',
  '샤워실',
  '주차장',
  '사우나',
  '개인락커',
  '운동복',
  '와이파이',
  '인바디',
];

const facilityIcons: Record<string, string> = {
  수건: '/gym/icons/towel.svg',
  샤워실: '/gym/icons/shower.svg',
  주차장: '/gym/icons/parking.svg',
  사우나: '/gym/icons/sauna.svg',
  개인락커: '/gym/icons/locker.svg',
  운동복: '/gym/icons/cloth.svg',
  와이파이: '/gym/icons/wifi.svg',
  인바디: '/gym/icons/inbody.svg',
};

const dummyEquipments = [
  { name: '벤치프레스', count: 2, image: '/gym/equipment/benchpress.jpg' },
  { name: '런닝머신', count: 5, image: '/gym/equipment/treadmill.jpg' },
  { name: '스쿼트랙', count: 3, image: '/gym/equipment/squat.jpg' },
  { name: '케이블머신', count: 1, image: '/gym/equipment/cable.jpg' },
  { name: '덤벨세트', count: 20, image: '/gym/equipment/dumbbell.jpg' },
];

export default function GymDetailPanel({ gym }: GymDetailPanelProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [selectedTab, setSelectedTab] = useState('home');
  const imageList = Array.from({ length: 10 }, (_) => `/gym_sample.jpg`);

  return (
    <div className="absolute top-[64px] left-[436px] h-[calc(100%-64px)] w-[440px] bg-white rounded-2xl shadow-2xl z-10 flex flex-col overflow-hidden">
      {/* 이미지 */}
      <div className="flex gap-[2px] w-full h-[220px] rounded-tl-2xl rounded-tr-2xl overflow-hidden">
        <div className="w-2/3 h-full">
          <button
            className="w-full h-full"
            onClick={() => setIsGalleryOpen(true)}
          >
            <NextImage
              alt="big-img"
              className="object-cover w-full h-full"
              height={220}
              src="/gym_sample.jpg"
              width={300}
            />
          </button>
        </div>
        <div className="flex flex-col w-1/3 h-full gap-[2px]">
          {[1, 2].map((i) => (
            <button
              key={i}
              className="w-full h-1/2"
              onClick={() => setIsGalleryOpen(true)}
            >
              <NextImage
                alt={`small-img-${i}`}
                className="object-cover w-full h-full"
                height={105}
                src="/gym_sample.jpg"
                width={100}
              />
            </button>
          ))}
        </div>
      </div>

      {/* 본문 */}
      <div className="flex justify-between items-start p-4 border-b border-mono_200">
        <div className="flex flex-col gap-[16px]">
          <h3 className="text-[24px] font-bold font-pretendard text-mono_800">
            비헬씨 서초점 {gym}
          </h3>
          <p className="text-[16px] font-pretendard text-mono_500">
            서울시 강남구 역삼동 | 02-123-4567
          </p>
        </div>
        <div className="flex flex-col items-end gap-4">
          <div className="flex gap-2">
            <Button
              isIconOnly
              className="w-8 h-8 min-w-0"
              radius="sm"
              variant="light"
              onClick={() => setLiked(!liked)}
            >
              {liked ? (
                <HeartSolid className="w-6 h-6 text-main transition-all" />
              ) : (
                <HeartOutline className="w-6 h-6 text-mono_600 hover:text-main transition-all" />
              )}
            </Button>
            <Button
              isIconOnly
              className="w-8 h-8 min-w-0"
              radius="sm"
              variant="light"
            >
              <MapIcon className="w-6 h-6 text-mono_600 hover:text-main transition-all" />
            </Button>
            <Button
              isIconOnly
              className="w-8 h-8 min-w-0"
              radius="sm"
              variant="light"
            >
              <ShareIcon className="w-6 h-6 text-mono_600 hover:text-main transition-all" />
            </Button>
          </div>
          <Button
            className="w-[100px] h-[32px] text-[14px] bg-main text-mono_000 font-pretendard hover:opacity-90 active:opacity-80 transition"
            radius="sm"
            size="sm"
          >
            등록
          </Button>
        </div>
      </div>

      {/* 탭 */}
      <div className="h-[48px] px-2 border-b border-mono_200">
        <GymTabs selectedTab={selectedTab} onChange={setSelectedTab} />
      </div>

      {/* 상세 */}
      <div className="flex-1 p-4 overflow-y-auto">
        {selectedTab === 'home' && (
          <>
            <GymIntroSection
              content={
                '센터에 대한 소개글입니다...\n줄바꿈도 지원합니다.\n내용이 많으면 더보기 버튼이 생깁니다.'
              }
            />
            <div className="mt-6">
              <GymTimeFeeSection
                feeInfo={['1시간: 0000원']}
                timeInfo={[
                  '평일 00:00 ~ 24:00',
                  '토요일 00:00 ~ 22:00',
                  '일요일 10:00 ~ 22:00',
                ]}
              />
            </div>
            <div className="mt-6">
              <SelectedFacilitySection
                facilities={allFacilities}
                iconMap={facilityIcons}
                selected={false}
              />
            </div>
            <div className="mt-6">
              <EquipmentSection equipments={dummyEquipments} />
            </div>
            <div className="mt-6">
              <GymTrainerSection />
            </div>
          </>
        )}
        {selectedTab === 'instructors' && <div>강사 탭 준비중</div>}
        {selectedTab === 'review' && <div>리뷰 탭 준비중</div>}
        {selectedTab === 'facility' && <div>시설 탭 준비중</div>}
      </div>

      {/* 모달 */}
      <ModalImageGallery
        imageList={imageList}
        isOpen={isGalleryOpen}
        onOpenChange={() => setIsGalleryOpen(false)}
      />
    </div>
  );
}
