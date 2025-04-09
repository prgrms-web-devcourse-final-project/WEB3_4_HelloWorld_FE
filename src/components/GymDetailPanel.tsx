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
import EquipmentSection from './molecules/EquipmentSection';
import GymTrainerSection from './molecules/GymTrainerSection';
import GymReviewSection from './molecules/GymReviewSection';

import { dummyGymDetailData } from '@/constants/dummyGymDetailData';

interface GymDetailPanelProps {
  gymId: number;
  visible: boolean;
  onClose: () => void;
  map: any;
  myLocation: { lat: number; lon: number } | null;
  onRouteReady?: (data: RouteInfo) => void;
}
interface RouteInfo {
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
  map,
  myLocation,
  onRouteReady,
}: GymDetailPanelProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [selectedTab, setSelectedTab] = useState('home');
  const [isVisible, setIsVisible] = useState(false);
  const polylineRef = useRef<any>(null);

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

  const handleRouteSearch = async () => {
    if (!myLocation) {
      alert('현재 위치 정보를 가져올 수 없습니다.');

      return;
    }
    const myLat = myLocation.lat;
    const myLon = myLocation.lon;

    const gymLat = parseFloat(gym.yField);
    const gymLon = parseFloat(gym.xField);

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

      const itinerary = data?.metaData?.plan?.itineraries?.[0];

      if (!itinerary) {
        alert('경로 정보를 찾을 수 없습니다.');

        return;
      }

      // 🧭 routeInfo 형식 만들기
      const steps = itinerary.legs.map((leg: any) => ({
        mode: leg.mode,
        sectionTime: leg.sectionTime,
        startName: leg.start?.name || '-',
        endName: leg.end?.name || '-',
        route: leg.route || leg.routeName || '-',
      }));

      // ✅ 부모에게 전달
      onRouteReady?.({
        startAddress: '내 위치',
        endAddress: gym.address,
        totalTime: itinerary.totalTime,
        totalDistance: itinerary.totalDistance,
        totalWalkDistance: itinerary.totalWalkDistance,
        transferCount: itinerary.transferCount,
        steps,
      });

      // ✅ summary 대신 직접 필드 사용
      const time = itinerary.totalTime;
      const distance = itinerary.totalDistance;
      const transfers = itinerary.transferCount;
      const walk = itinerary.totalWalkDistance;

      alert(
        `경로 찾기 성공!
  예상 소요시간: ${(time / 60).toFixed(1)}분
  이동 거리: ${(distance / 1000).toFixed(2)}km
  환승 횟수: ${transfers}회
  도보 거리: ${walk}m`,
      );

      // 기존 선 지우기
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
      }

      // legs 경로 그리기
      const legs = itinerary.legs;

      legs.forEach(
        (leg: { mode: string; passShape?: { linestring: string } }) => {
          const linestring = leg.passShape?.linestring;

          if (!linestring) return;

          const coords = linestring.split(' ').map((point: string) => {
            const [lon, lat] = point.split(',').map(Number);

            return new window.Tmapv2.LatLng(lat, lon);
          });

          // 구간 유형별 색상 지정
          let color = '#999999'; // default: 도보

          if (leg.mode === 'BUS') color = '#0078FF';
          if (leg.mode === 'SUBWAY') color = '#2DB400';

          const polyline = new window.Tmapv2.Polyline({
            path: coords,
            strokeColor: color,
            strokeWeight: 5,
            map,
          });

          polylineRef.current = polyline;
        },
      );
    } catch (error) {
      console.error('🔥 요청 실패:', error);
      alert('길찾기 요청 중 문제가 발생했습니다');
    }
  };

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
      {/* 이미지 모달 */}
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
      {/* 패널 상단 */}
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
          >
            등록
          </Button>
        </div>
      </div>

      <div className="h-[48px] px-2 border-b border-mono_200">
        <GymTabs selectedTab={selectedTab} onChange={setSelectedTab} />
      </div>
      {/* 탭 별 컨텐츠 */}
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
