import { useState, useEffect } from 'react';
import NextImage from 'next/image';
import { Button } from '@heroui/react';
import {
  HeartIcon as HeartOutline,
  MapIcon,
  ShareIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

import ModalImageGallery from './molecules/ModalImageGallery';
import GymTabs from './molecules/GymTabs';
import GymIntroSection from './molecules/GymIntroSection';
import GymTimeFeeSection from './molecules/GymTimeFeeSection';
import SelectedFacilitySection from './molecules/SelectedFacilitySection';
import EquipmentSection from './molecules/EquipmentSection';
import GymTrainerSection from './molecules/GymTrainerSection';
import GymReviewSection from './molecules/GymReviewSection';

import { dummyGymDetailData } from '@/constants/dummyGymDetailData';

interface GymDetailPanelProps {
  gymId: number;
  visible: boolean;
  onClose: () => void;
}

const facilityLabelMap: Record<string, string> = {
  towel: '수건',
  showerRoom: '샤워실',
  parking: '주차장',
  sauna: '사우나',
  locker: '개인락커',
  sportswear: '운동복',
  wifi: '와이파이',
  inbody: '인바디',
};

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

export default function GymDetailPanel({
  gymId,
  visible,
  onClose,
}: GymDetailPanelProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [selectedTab, setSelectedTab] = useState('home');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);
  const gymData = dummyGymDetailData[gymId];

  if (!gymData) return null;

  const { gym, gymImages, reviews, machines, gymProducts, trainers } = gymData;

  const availableFacilities = Object.entries(gym.facilities)
    .filter(([_, val]) => val)
    .map(([key]) => facilityLabelMap[key]);

  const mappedMachines = machines.map((m) => ({
    name: m.name,
    count: 1,
    image: m.machineImages[0] || '/gym_sample.jpg',
  }));

  const mappedReviews = reviews.map((r, index) => ({
    id: `${r.reviewId}`,
    nickname: `회원${index + 1}`,
    profileImage: '/gym/review/profile1.jpg',
    date: '2025.04.01',
    rating: r.score,
    images: r.reviewImages,
    content: r.content,
  }));

  return (
    <div
      className={`
    absolute top-[80px] left-0 h-[calc(100%-96px)] w-[440px]
    bg-white rounded-2xl shadow-2xl z-10 flex flex-col overflow-hidden
    transition-transform duration-500 ease-in-out
    ${visible ? 'translate-x-[440px]' : 'translate-x-0'}
  `}
    >
      <button
        className="absolute top-2 right-2 z-20 hover:opacity-70 transition"
        onClick={onClose}
      >
        <XMarkIcon className="w-8 h-8 text-white" />
      </button>

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
              src={gymImages[0] || '/gym_sample.jpg'}
              width={300}
            />
          </button>
        </div>
        <div className="flex flex-col w-1/3 h-full gap-[2px]">
          {gymImages.slice(1, 3).map((img, i) => (
            <button
              key={i}
              className="w-full h-1/2"
              onClick={() => setIsGalleryOpen(true)}
            >
              <NextImage
                alt={`small-img-${i}`}
                className="object-cover w-full h-full"
                height={105}
                src={img}
                width={100}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-start p-4 border-b border-mono_200">
        <div className="flex flex-col gap-[8px]">
          <h3 className="text-[20px] font-bold text-mono_800">{gym.gymName}</h3>
          <p className="text-[14px] text-mono_500">
            {gym.address} | {gym.phoneNumber}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-2">
            <Button
              isIconOnly
              radius="sm"
              variant="light"
              onClick={() => setLiked(!liked)}
            >
              {liked ? (
                <HeartSolid className="w-6 h-6 text-main" />
              ) : (
                <HeartOutline className="w-6 h-6 text-mono_600 hover:text-main" />
              )}
            </Button>
            <Button isIconOnly radius="sm" variant="light">
              <MapIcon className="w-6 h-6 text-mono_600 hover:text-main" />
            </Button>
            <Button isIconOnly radius="sm" variant="light">
              <ShareIcon className="w-6 h-6 text-mono_600 hover:text-main" />
            </Button>
          </div>
          <Button
            className="w-[100px] h-[32px] text-[14px] bg-main text-white hover:opacity-90"
            radius="sm"
            size="sm"
          >
            등록
          </Button>
        </div>
      </div>

      <div className="h-[48px] px-2 border-b border-mono_200">
        <GymTabs selectedTab={selectedTab} onChange={setSelectedTab} />
      </div>

      <div
        className="
    flex-1 p-4 overflow-y-auto
    scrollbar-thin scrollbar-thumb-rounded-xl
    scrollbar-track-transparent scrollbar-thumb-mono_200
    transition-all duration-300
    [&:active]:scrollbar-thumb-mono_300
  "
      >
        {selectedTab === 'home' && (
          <>
            <GymIntroSection content={gym.intro} />
            <div className="mt-6">
              <GymTimeFeeSection
                feeInfo={gymProducts.map(
                  (p) =>
                    `${p.productName}: ${p.productPrice.toLocaleString()}원`,
                )}
                timeInfo={[`${gym.startTime} ~ ${gym.endTime}`]}
              />
            </div>
            <div className="mt-6">
              <SelectedFacilitySection
                facilities={availableFacilities}
                iconMap={facilityIcons}
                selected={false}
              />
            </div>
            <div className="mt-6">
              <EquipmentSection equipments={mappedMachines} />
            </div>
            <div className="mt-6">
              <GymTrainerSection trainers={trainers} />
            </div>
            <div className="mt-6">
              <GymReviewSection reviews={mappedReviews} />
            </div>
          </>
        )}

        {selectedTab === 'instructors' && (
          <div className="mt-4">
            <GymTrainerSection fullView trainers={trainers} />
          </div>
        )}

        {selectedTab === 'review' && (
          <div className="mt-4">
            <GymReviewSection fullView reviews={mappedReviews} />
          </div>
        )}

        {selectedTab === 'facility' && (
          <>
            <div className="mt-6">
              <SelectedFacilitySection
                facilities={availableFacilities}
                iconMap={facilityIcons}
                selected={false}
              />
            </div>
            <div className="mt-6">
              <EquipmentSection fullView equipments={mappedMachines} />
            </div>
          </>
        )}
      </div>

      <ModalImageGallery
        imageList={gymImages}
        isOpen={isGalleryOpen}
        onOpenChange={() => setIsGalleryOpen(false)}
      />
    </div>
  );
}
