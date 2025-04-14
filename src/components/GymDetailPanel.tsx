'use client';

import type {
  GymTrainer,
  GymFacilityResponse,
  GymDetailResponse,
  MachineResponse,
} from '@/types/gyms';

import { useState, useEffect, useRef } from 'react';
import NextImage from 'next/image';
import { Button } from '@heroui/button';
import { Modal, ModalContent, ModalBody, ModalHeader } from '@heroui/react';
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

import { fetchPurchaseTicketApi } from '@/apis/gymTicketsApi';
import { Trainer } from '@/components/molecules/GymTrainerSection';
import {
  fetchGymDetailApi,
  fetchGymFacilitiesApi,
  fetchGymTrainersApi,
} from '@/apis/gymApi';
import useToast from '@/hooks/useToast';
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

// 주차장: 'parking',
// 샤워실: 'showerRoom',
// 인바디: 'inBody',
// '개인 락커': 'locker',
// 와이파이: 'wifi',
// '운동복 대여': 'sportsWear',
// '수건 제공': 'towel',
// 사우나: 'sauna',

const facilityLabelMap: Record<string, string> = {
  towel: '수건',
  showerRoom: '샤워실',
  parking: '주차장',
  sauna: '사우나',
  locker: '개인락커',
  sportsWear: '운동복',
  wifi: '와이파이',
  inBody: '인바디',
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
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [gymData, setGymData] = useState<GymDetailResponse | null>(null);
  const [facilities, setFacilities] = useState<GymFacilityResponse | null>(
    null,
  );
  const [trainers, setTrainers] = useState<GymTrainer[]>([]);
  const polylineRef = useRef<any>(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (!gymId || !visible) return;

    const fetchAll = async () => {
      try {
        const [detail, trainerList, facility] = await Promise.all([
          fetchGymDetailApi(gymId),
          fetchGymTrainersApi(gymId),
          fetchGymFacilitiesApi(gymId),
        ]);

        setGymData(detail);
        setFacilities(facility);
        setTrainers(trainerList);
      } catch {}
    };

    fetchAll();
  }, [gymId, visible]);

  if (!gymData) return null;

  const handleProductClick = () => {
    if (
      !gymData?.gymProductResponses ||
      gymData.gymProductResponses.length === 0
    ) {
      showToast({
        title: '등록된 상품이 없습니다.',
        description: '등록된 상품이 없습니다.',
        type: 'danger',
      });

      return;
    }

    setIsProductModalOpen(true);
  };

  const availableFacilities = Object.entries(facilities || {})
    .filter(([key, val]) => val && key in facilityLabelMap)
    .map(([key]) => facilityLabelMap[key]);

  const mappedMachines =
    facilities?.machineResponses?.map((m: MachineResponse) => ({
      name: m.machineName,
      count: m.amount,
      image: m.machineImage || '/gym_sample.jpg',
    })) || [];

  const mappedReviews =
    gymData?.gymReviews?.map((r, index) => ({
      id: `${r.reviewId}`,
      nickname: `회원${index + 1}`,
      profileImage: '/gym/review/profile1.jpg',
      date: '2025.04.01',
      rating: r.score,
      images: r.reviewImages,
      content: r.content,
    })) || [];

  const mappedFeeInfo =
    gymData?.gymProductResponses?.map((p) => {
      const month = p.gymProductMonth ?? '-';
      const fee =
        typeof p.gymProductFee === 'number'
          ? p.gymProductFee.toLocaleString()
          : '가격 정보 없음';

      return `${month}개월: ${fee}원`;
    }) || [];

  const mappedTrainers: Trainer[] = trainers.map((t) => ({
    name: t.trainerName,
    description: t.intro,
    price:
      typeof t.ptProducts?.[0]?.ptProductFee === 'number'
        ? t.ptProducts[0].ptProductFee.toLocaleString() + '원'
        : '가격 미정',
    specialty: t.field,
    career: t.career,
    awards: Array.isArray(t.awards)
      ? t.awards.map((a) => `${a.awardYear} ${a.awardName}`).join(', ')
      : '',
    image: t.profileUrl,
  }));

  const handleRouteSearch = async () => {
    if (!myLocation) {
      showToast({
        title: '현재 위치 정보를 가져올 수 없습니다.',
        description: '현재 위치 정보를 가져올 수 없습니다.',
        type: 'danger',
      });

      return;
    }

    const myLat = myLocation.lat;
    const myLon = myLocation.lon;
    const gymLat = parseFloat(gymData.yField);
    const gymLon = parseFloat(gymData.xField);

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
            startX: myLon.toString(),
            startY: myLat.toString(),
            endX: gymLon.toString(),
            endY: gymLat.toString(),
            lang: 0,
            format: 'json',
          }),
        },
      );

      const data = await response.json();
      const itineraries = data?.metaData?.plan?.itineraries;

      if (!itineraries || itineraries.length === 0) {
        showToast({
          title: '경로 정보를 찾을 수 없습니다.',
          description: '경로 정보를 찾을 수 없습니다.',
          type: 'danger',
        });

        return;
      }

      const routeOptions: RouteData[] = itineraries.map((itinerary: any) => ({
        startAddress: '내 위치',
        endAddress: gymData.address,
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
    } catch {
      showToast({
        title: '길찾기 요청 중 문제가 발생했습니다',
        description: '길찾기 요청 중 문제가 발생했습니다',
        type: 'danger',
      });
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
        <XMarkIcon className="w-8 h-8 text-mono_800" />
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
              src={gymData.gymImages[0] || '/gym_sample.jpg'}
              width={300}
            />
          </button>
        </div>
        <div className="flex flex-col w-1/3 h-full gap-[2px]">
          {gymData.gymImages.slice(1, 3).map((img, i) => (
            <button
              key={i}
              className="w-full h-1/2"
              onClick={() => setIsGalleryOpen(true)}
            >
              <NextImage
                alt={`small-img-${i}`}
                className="object-cover w-full h-full"
                height={105}
                src={img || '/gym_sample.jpg'}
                width={100}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-start p-4 border-b border-mono_200">
        <div className="flex flex-col gap-[8px]">
          <h3 className="text-[20px] font-bold text-mono_800">
            {gymData.gymName}
          </h3>
          <p className="text-[14px] text-mono_500">
            {gymData.address} | {gymData.phoneNumber}
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
            onClick={handleProductClick}
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
            <GymIntroSection content={gymData?.intro || ''} />
            <div className="mt-6">
              <GymTimeFeeSection
                feeInfo={mappedFeeInfo}
                timeInfo={[
                  gymData.startTime && gymData.endTime
                    ? `${gymData.startTime} ~ ${gymData.endTime}`
                    : '등록된 영업시간이 없습니다.',
                ]}
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
              <GymTrainerSection trainers={mappedTrainers} />
            </div>
            <div className="mt-6">
              <GymReviewSection reviews={mappedReviews} />
            </div>
          </>
        )}

        {selectedTab === 'instructors' && (
          <div className="mt-4">
            <GymTrainerSection fullView trainers={mappedTrainers} />
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
                className="dark:invert"
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
        imageList={gymData.gymImages}
        isOpen={isGalleryOpen}
        onOpenChange={() => setIsGalleryOpen(false)}
      />
      <Modal
        isOpen={isProductModalOpen}
        placement="center"
        size="xl"
        onOpenChange={setIsProductModalOpen}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-base font-semibold">
                등록된 상품 목록
              </ModalHeader>
              <ModalBody className="space-y-1">
                {gymData?.gymProductResponses?.map((p) => (
                  <p key={p.gymProductId} className="text-sm text-mono_700">
                    {p.gymProductMonth}개월: {p.gymProductFee.toLocaleString()}
                    원
                  </p>
                ))}
                <Button
                  className="mt-2 w-full bg-main text-mono_100 hover:opacity-90 mb-2"
                  radius="sm"
                  size="sm"
                  onClick={async () => {
                    const product = gymData?.gymProductResponses?.[0];

                    if (!product) return;

                    try {
                      await fetchPurchaseTicketApi(product.gymProductId);
                      showToast({
                        title: '구매에 성공했습니다.',
                        description:
                          '구매에 성공했습니다. 티켓 목록에서 확인해주세요.',
                      });
                      onClose();
                    } catch {
                      showToast({
                        title: '구매에 실패했습니다.',
                        description:
                          '구매에 실패했습니다. 로그인 상태를 확인해주세요',
                        type: 'danger',
                      });
                    }
                  }}
                >
                  등록하기
                </Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
