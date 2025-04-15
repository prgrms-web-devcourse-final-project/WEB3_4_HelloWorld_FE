import type { GymDetailResponse } from '@/types/gym';

import { useState, useEffect, useRef } from 'react';
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
import GymTrainerSection from './molecules/GymTrainerSection';
import GymReviewSection from './molecules/GymReviewSection';
import GymPurchaseModal from './molecules/GymPurchaseModal';

import {
  fetchGymDetail,
  fetchGymFacilities,
  fetchGymTrainers,
  fetchGymReviews,
} from '@/apis/gymApi';

interface GymDetailPanelProps {
  gymId: number;
  visible: boolean;
  onClose: () => void;
  map: any;
  myLocation: { lat: number; lon: number } | null;
  onRouteReady?: (data: RouteData[]) => void;
  panelTranslateX?: string;
}

interface RouteData {
  startAddress: string;
  endAddress: string;
  totalTime: number;
  totalDistance: number;
  totalWalkDistance: number;
  transferCount: number;
  steps: {
    mode: string;
    sectionTime: number;
    startName: string;
    endName: string;
    route: string;
  }[];
  legs: {
    mode: string;
    passShape?: { linestring: string };
  }[];
}

const facilityLabelMap: Record<string, string> = {
  towel: '수건',
  showerroom: '샤워실',
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
  map,
  myLocation,
  onRouteReady,
  panelTranslateX,
}: GymDetailPanelProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [selectedTab, setSelectedTab] = useState('home');
  const [gymData, setGymData] = useState<GymDetailResponse | null>(null);
  const [trainers, setTrainers] = useState<any[]>([]);
  const [availableFacilities, setAvailableFacilities] = useState<string[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const polylineRef = useRef<any>(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  useEffect(() => {
    if (visible) {
      const fetchData = async () => {
        try {
          const detail = await fetchGymDetail(gymId);

          setGymData(detail);

          const trainerData = await fetchGymTrainers(gymId);
          const parsedTrainers = trainerData.map((t: any) => ({
            name: t.trainerName,
            description: t.intro,
            specialty: t.field,
            career: t.career,
            image: t.profileUrl,
            price: t.ptProducts?.[0]?.ptProductFee?.toLocaleString() || '-',
            awards: t.awards || [],
          }));

          setTrainers(parsedTrainers);

          const facilityData = await fetchGymFacilities(gymId);
          const enabled = Object.entries(facilityData.facilityResponse)
            .filter(([_, val]) => val)
            .map(([key]) => facilityLabelMap[key.toLowerCase()]);

          setAvailableFacilities(enabled);

          // ✅ 리뷰 데이터 추가
          const reviewRes = await fetchGymReviews(gymId);
          const parsedReviews = reviewRes.content.map((r: any) => ({
            id: r.gymReviewId,
            nickname: '익명', // 닉네임 필드 없으므로 가공 필요
            date: r.createdAt.split('T')[0],
            rating: r.score,
            images: r.images.map((img: any) => img.imageUrl),
            content: r.content,
            profileImage: '/default_profile.png', // 기본 이미지
          }));

          setReviews(parsedReviews);
        } catch (err) {
          console.error('❌ 패널 로딩 실패:', err);
        }
      };

      fetchData();
    }
  }, [visible, gymId]);

  if (!gymData) return null;

  const {
    gymName,
    address,
    phoneNumber,
    startTime,
    endTime,
    xField,
    yField,
    intro,
    gymImages,
    gymProductResponses,
  } = gymData;

  const handleRouteSearch = async () => {
    if (!myLocation) return alert('현재 위치 정보를 가져올 수 없습니다.');

    try {
      const response = await fetch(
        'https://apis.openapi.sk.com/transit/routes',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            appKey: process.env.NEXT_PUBLIC_TMAP_APP_KEY || '',
          },
          body: JSON.stringify({
            startX: myLocation.lon.toString(),
            startY: myLocation.lat.toString(),
            endX: xField,
            endY: yField,
            lang: 0,
            format: 'json',
          }),
        },
      );
      const data = await response.json();
      const itineraries = data?.metaData?.plan?.itineraries;

      if (!itineraries) return alert('경로 정보를 찾을 수 없습니다.');

      const routeOptions: RouteData[] = itineraries.map((itinerary: any) => ({
        startAddress: '내 위치',
        endAddress: address,
        totalTime: itinerary.totalTime,
        totalDistance: itinerary.totalDistance,
        totalWalkDistance: itinerary.totalWalkDistance,
        transferCount: itinerary.transferCount,
        steps: itinerary.legs.map((leg: any) => ({
          mode: leg.mode,
          sectionTime: leg.sectionTime,
          startName: leg.start?.name || '-',
          endName: leg.end?.name || '-',
          route: leg.route || leg.routeName || '-',
        })),
        legs: itinerary.legs,
      }));

      onRouteReady?.(routeOptions);
    } catch (err) {
      console.error('길찾기 요청 실패:', err);
      alert('길찾기 요청 중 문제가 발생했습니다');
    }
  };

  return (
    <div
      className={`absolute top-[80px] left-0 h-[calc(100%-96px)] w-[440px] bg-mono_100 rounded-2xl shadow-2xl z-10 flex flex-col overflow-hidden transition-transform duration-500 ease-in-out ${panelTranslateX}`}
    >
      <button
        className="absolute top-2 right-2 z-20 hover:opacity-70 transition"
        onClick={onClose}
      >
        <XMarkIcon className="w-8 h-8 text-mono_100" />
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
          <h3 className="text-[20px] font-bold text-mono_800">{gymName}</h3>
          <p className="text-[14px] text-mono_500">
            {address} | {phoneNumber}
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
            <Button
              isIconOnly
              radius="sm"
              variant="light"
              onClick={handleRouteSearch}
            >
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
            onClick={() => setIsPurchaseModalOpen(true)} // ✅ 이 부분 추가
          >
            등록
          </Button>
        </div>
      </div>

      <div className="h-[48px] px-2 border-b border-mono_200">
        <GymTabs selectedTab={selectedTab} onChange={setSelectedTab} />
      </div>

      <div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-xl scrollbar-track-transparent scrollbar-thumb-mono_200 transition-all duration-300 [&:active]:scrollbar-thumb-mono_300">
        {selectedTab === 'home' && (
          <>
            <GymIntroSection content={intro} />
            <div className="mt-6">
              <GymTimeFeeSection
                feeInfo={gymProductResponses.map(
                  (p) =>
                    `${p.gymProductMonth}개월권: ${p.gymProductFee.toLocaleString()}원`,
                )}
                timeInfo={[`${startTime} ~ ${endTime}`]}
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
              <GymTrainerSection trainers={trainers} />
            </div>
            {/* <div className="mt-6">
              <EquipmentSection equipments={mappedMachines} />
            </div>
            <div className="mt-6">
              <GymReviewSection reviews={mappedReviews} />
            </div> */}
          </>
        )}

        {selectedTab === 'instructors' && (
          <div className="mt-4">
            <GymTrainerSection fullView trainers={trainers} />
          </div>
        )}

        {selectedTab === 'review' && (
          <div className="mt-4">
            <GymReviewSection fullView reviews={reviews} />
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
            {/* <div className="mt-6">
              <EquipmentSection fullView equipments={mappedMachines} />
            </div> */}
          </>
        )}
      </div>

      <ModalImageGallery
        imageList={gymImages}
        isOpen={isGalleryOpen}
        onOpenChange={() => setIsGalleryOpen(false)}
      />
      <GymPurchaseModal
        gymName={gymName}
        isOpen={isPurchaseModalOpen}
        products={gymProductResponses}
        onClose={() => setIsPurchaseModalOpen(false)}
      />
    </div>
  );
}
