'use client';

import { useEffect, useRef, useState } from 'react';
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { MapPinIcon, StarIcon } from '@heroicons/react/24/solid';
import { Input, Pagination } from '@heroui/react';
import { Image } from '@heroui/react';

import { MyButton } from '@/components/atoms/Button';
import GymDetailPanel from '@/components/GymDetailPanel';

declare global {
  interface Window {
    kakao: any;
  }
}

const dummyGyms = [
  {
    gymId: 1,
    gymName: '비헬씨 서초점',
    startTime: '06:00',
    endTime: '23:00',
    address: '서울시 서초구 강남대로 123',
    xField: '127.0321',
    yField: '37.4979',
    avgScore: 4.8,
    isPartner: true,
    thumbnailImage: '/gym_sample.jpg',
  },
  {
    gymId: 2,
    gymName: '세연헬스',
    startTime: '08:00',
    endTime: '24:00',
    address: '서울 노원구 역삼동 123-4',
    xField: '127.123456',
    yField: '37.123456',
    avgScore: 4.6,
    isPartner: true,
    thumbnailImage: '/gym_sample.jpg',
  },
  {
    gymId: 3,
    gymName: '머슬팩토리 강남점',
    startTime: '07:00',
    endTime: '23:00',
    address: '서울시 강남구 테헤란로 501',
    xField: '127.0453',
    yField: '37.5051',
    avgScore: 4.2,
    isPartner: true,
    thumbnailImage: '/gym_sample.jpg',
  },
  {
    gymId: 4,
    gymName: '헬스플래닛 신촌점',
    startTime: '00:00',
    endTime: '24:00',
    address: '서울시 마포구 신촌로 88',
    xField: '126.9368',
    yField: '37.5599',
    avgScore: 4.9,
    isPartner: true,
    thumbnailImage: '/gym_sample.jpg',
  },
  {
    gymId: 5,
    gymName: '골드짐 영등포',
    startTime: '06:00',
    endTime: '22:00',
    address: '서울시 영등포구 여의도동 17',
    xField: '126.9245',
    yField: '37.5218',
    avgScore: 4.1,
    isPartner: true,
    thumbnailImage: '/gym_sample.jpg',
  },
  {
    gymId: 6,
    gymName: '피트니스247 합정',
    startTime: '09:00',
    endTime: '21:00',
    address: '서울시 마포구 합정동 23',
    xField: '126.9092',
    yField: '37.5503',
    avgScore: 3.8,
    isPartner: true,
    thumbnailImage: '/gym_sample.jpg',
  },
  {
    gymId: 7,
    gymName: '아이언짐 강서',
    startTime: '05:00',
    endTime: '23:00',
    address: '서울시 강서구 화곡로 52',
    xField: '126.8491',
    yField: '37.5500',
    avgScore: 4.7,
    isPartner: true,
    thumbnailImage: '/gym_sample.jpg',
  },
  {
    gymId: 8,
    gymName: '더짐 노원',
    startTime: '10:00',
    endTime: '22:00',
    address: '서울시 노원구 상계동 456',
    xField: '127.0641',
    yField: '37.6543',
    avgScore: 4.0,
    isPartner: true,
    thumbnailImage: '/gym_sample.jpg',
  },
  {
    gymId: 9,
    gymName: '챔피언짐 동작',
    startTime: '06:00',
    endTime: '22:00',
    address: '서울시 동작구 사당로 98',
    xField: '126.9814',
    yField: '37.4911',
    avgScore: 3.9,
    isPartner: true,
    thumbnailImage: '/gym_sample.jpg',
  },
  {
    gymId: 10,
    gymName: '파워짐 송파',
    startTime: '05:00',
    endTime: '23:00',
    address: '서울시 송파구 잠실동 789',
    xField: '127.1035',
    yField: '37.5143',
    avgScore: 4.5,
    isPartner: true,
    thumbnailImage: '/gym_sample.jpg',
  },
  {
    gymId: 11,
    gymName: '에브리핏 관악',
    startTime: '08:00',
    endTime: '20:00',
    address: '서울시 관악구 봉천로 12',
    xField: '126.9411',
    yField: '37.4800',
    avgScore: 4.3,
    isPartner: true,
    thumbnailImage: '/gym_sample.jpg',
  },
  {
    gymId: 12,
    gymName: '바디빌더 헬스클럽',
    startTime: '06:00',
    endTime: '22:00',
    address: '서울시 성동구 성수이로 100',
    xField: '127.0447',
    yField: '37.5443',
    avgScore: 4.6,
    isPartner: true,
    thumbnailImage: '/gym_sample.jpg',
  },
];

export default function GymPage() {
  const [selected, setSelected] = useState('최신순');
  const filters = ['최신순', '평점순', '거리순'];

  const gyms = dummyGyms;
  const [page, setPage] = useState(1);
  const perPage = 6;
  const totalPages = Math.ceil(gyms.length / perPage);
  const currentList = gyms.slice((page - 1) * perPage, page * perPage);

  const [isOpen, setIsOpen] = useState(true);
  const [selectedGym, setSelectedGym] = useState<(typeof gyms)[0] | null>(null);
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  const [userAddress, setUserAddress] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const toggleTranslateX = isOpen
    ? isPanelVisible
      ? 'translate-x-[896px]' // 사이드바 + 상세 패널 열림
      : 'translate-x-[436px]' // 사이드바만 열림
    : 'translate-x-[16px]'; // 닫힘

  useEffect(() => {
    const script = document.createElement('script');

    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            const container = mapRef.current;
            const options = {
              center: new window.kakao.maps.LatLng(lat, lng),
              level: 3,
            };
            const map = new window.kakao.maps.Map(container, options);

            const marker = new window.kakao.maps.Marker({
              position: new window.kakao.maps.LatLng(lat, lng),
              map,
            });

            const geocoder = new window.kakao.maps.services.Geocoder();
            const coord = new window.kakao.maps.LatLng(lat, lng);

            geocoder.coord2Address(
              coord.getLng(),
              coord.getLat(),
              (result: any, status: any) => {
                if (status === window.kakao.maps.services.Status.OK) {
                  const address = result[0].address.address_name;

                  setUserAddress(address);
                }
              },
            );
          });
        }
      });
    };
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (selectedGym) {
      const timer = setTimeout(() => setIsPanelVisible(true), 100);

      return () => clearTimeout(timer);
    } else {
      setIsPanelVisible(false);
    }
  }, [selectedGym]);

  return (
    <div className="relative w-screen h-[calc(100vh-64px)]">
      {/* 카카오맵 */}
      <div ref={mapRef} className="absolute top-0 left-0 w-full h-full z-0" />

      {/* 사이드바 */}
      <div
        className={`
          absolute top-[64px] left-0 h-[calc(100%-64px)] z-20
          bg-white w-[420px] rounded-tr-2xl rounded-br-2xl shadow-2xl
          flex flex-col gap-4 overflow-hidden
          transition-transform duration-500
          ${isOpen ? 'translate-x-0' : '-translate-x-[420px]'}
        `}
      >
        <div className="p-5 pt-6 flex flex-col gap-4 h-full">
          <h2 className="text-xl font-bold text-mono_700 font-point">
            오늘의 운동 장소
          </h2>
          <Input
            endContent={
              <MagnifyingGlassIcon className="w-5 h-5 text-mono_400" />
            }
            placeholder="지역 / 지하철역 / 센터 / 선생님 검색"
            variant="flat"
          />
          <div className="flex gap-2">
            {filters.map((item) => (
              <MyButton
                key={item}
                color={selected === item ? 'main' : 'mono'}
                size="custom"
                onClick={() => setSelected(item)}
              >
                {item}
              </MyButton>
            ))}
          </div>

          <div className="flex items-center gap-1 pt-2 pb-3 border-b border-mono_200">
            <MapPinIcon className="w-4 h-4 text-main" />
            <p className="text-sm text-mono_700 font-semibold">
              {userAddress || '위치 정보를 불러오는 중...'}
              <span className="text-mono_400 font-normal"> 주변 검색 결과</span>
            </p>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pb-4 scrollbar-thin scrollbar-thumb-rounded-xl scrollbar-track-transparent scrollbar-thumb-mono_200 transition-all duration-300 [&:active]:scrollbar-thumb-mono_300">
            {currentList.map((gym) => (
              <div
                key={gym.gymId}
                className="flex items-center justify-between w-[368px] h-[140px] p-3 bg-white rounded-xl border border-mono_100 hover:bg-mono_100 transition cursor-pointer shadow-sm"
                role="button"
                tabIndex={0}
                onClick={() => setSelectedGym(gym)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setSelectedGym(gym);
                }}
              >
                <div className="flex flex-col justify-center gap-1 w-[65%] h-full">
                  <h3 className="text-[20px] font-medium text-mono_700">
                    {gym.gymName}
                  </h3>
                  <div className="text-[14px] text-mono_400">
                    <MapPinIcon className="w-3 h-3 mr-1 inline" />
                    {gym.address}
                  </div>
                  <div className="text-[14px] gap-2 text-mono_400">
                    <span className="text-[#5BA744] font-medium">● 운영중</span>{' '}
                    |
                    <span className="text-mono_400 font-normal">
                      {' '}
                      {gym.startTime} ~ {gym.endTime}
                    </span>
                  </div>
                  <div className="text-[14px] text-mono_400">
                    <StarIcon className="w-3 h-3 mr-1 text-yellow-400 inline" />{' '}
                    {gym.avgScore}
                  </div>
                </div>
                <Image
                  alt="gym"
                  className="rounded-lg object-cover"
                  height={100}
                  src={gym.thumbnailImage}
                  width={160}
                />
              </div>
            ))}

            <div className="flex justify-center pt-4">
              <Pagination
                className="[&_[data-slot=page]]:bg-mono_100 [&_[data-slot=page]]:text-mono_700 [&_[data-slot=page][data-selected=true]]:bg-main [&_[data-slot=page][data-selected=true]]:text-white"
                page={page}
                total={totalPages}
                onChange={setPage}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 상세 패널 */}
      {selectedGym && (
        <GymDetailPanel
          gymId={selectedGym.gymId}
          visible={isPanelVisible}
          onClose={() => setSelectedGym(null)}
        />
      )}

      {/* 사이드바 토글 버튼 */}
      <button
        className={`
          absolute top-[50%] translate-y-[-50%] z-30
          transition-transform duration-500 ease-in-out
          ${toggleTranslateX}
          w-8 h-8 shadow-md bg-white border border-mono_200
          flex items-center justify-center hover:bg-mono_100
        `}
        onClick={() => {
          if (isOpen && selectedGym) {
            setIsOpen(false);
            setSelectedGym(null);
          } else {
            setIsOpen(!isOpen);
          }
        }}
      >
        {isOpen ? (
          <ChevronLeftIcon className="w-4 h-4 text-mono_600" />
        ) : (
          <ChevronRightIcon className="w-4 h-4 text-mono_600" />
        )}
      </button>
    </div>
  );
}
