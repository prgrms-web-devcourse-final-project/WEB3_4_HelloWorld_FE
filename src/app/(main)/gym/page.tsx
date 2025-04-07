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

export default function GymPage() {
  const [selected, setSelected] = useState('최신순');
  const filters = ['최신순', '평점순', '거리순'];

  const gyms = Array.from({ length: 100 }, (_, i) => i + 1);
  const [page, setPage] = useState(1);
  const perPage = 10;
  const totalPages = Math.ceil(gyms.length / perPage);
  const currentList = gyms.slice((page - 1) * perPage, page * perPage);

  const [isOpen, setIsOpen] = useState(true);
  const handleToggle = () => setIsOpen(!isOpen);
  const [selectedGym, setSelectedGym] = useState<number | null>(null);

  const [userAddress, setUserAddress] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const [isPanelVisible, setIsPanelVisible] = useState(false);

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
      // 패널 애니메이션 0.5초 뒤에 버튼도 따라가도록
      const timer = setTimeout(() => setIsPanelVisible(true), 100);

      return () => clearTimeout(timer);
    } else {
      // 닫힐 때는 바로 false 처리
      setIsPanelVisible(false);
    }
  }, [selectedGym]);

  return (
    <div className="w-screen h-[calc(100vh-64px)]">
      {/* 지도 */}
      <div ref={mapRef} className="absolute top-0 left-0 w-full h-full z-0" />
      <button
        className={`
  absolute top-[50%] translate-y-[-50%] z-20
  transition-transform duration-500 ease-in-out
  ${isOpen && isPanelVisible ? 'translate-x-[876px]' : isOpen ? 'translate-x-[436px]' : 'translate-x-[16px]'}
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

      {/* 좌측 검색바 */}
      <div
        className={`
        absolute top-[64px] left-0 h-[calc(100%-64px)]
        ${isOpen ? 'w-[420px]' : 'w-0'}
        bg-white rounded-tr-2xl rounded-br-2xl
        shadow-2xl z-10 flex flex-col gap-4 overflow-hidden
        transition-all duration-500
      `}
      >
        {isOpen && (
          <div className="p-5 pt-6 flex flex-col gap-4 h-full">
            <h2 className="text-xl font-bold text-mono_700 font-point">
              오늘의 운동 장소
            </h2>

            {/* 검색창 */}
            <Input
              endContent={
                <MagnifyingGlassIcon className="w-5 h-5 text-mono_400" />
              }
              placeholder="지역 / 지하철역 / 센터 / 선생님 검색"
              variant="flat"
            />
            {/* 필터 */}
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

            {/* 필터 아래 위치 표시 */}
            <div className="flex items-center gap-1 pt-2 pb-3 border-b border-mono_200">
              <MapPinIcon className="w-4 h-4 text-main" />
              <p className="text-sm text-mono_700 font-semibold">
                {userAddress || '위치 정보를 불러오는 중...'}
                <span className="text-mono_400 font-normal">
                  {' '}
                  주변 검색 결과
                </span>
              </p>
            </div>

            {/* 리스트 */}
            <div
              className="
              flex-1 overflow-y-auto space-y-4 pb-4
              scrollbar-thin
              scrollbar-thumb-rounded-xl
              scrollbar-track-transparent
              scrollbar-thumb-mono_200
              transition-all
              duration-300
              [&:active]:scrollbar-thumb-mono_300
            "
            >
              {currentList.map((idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between w-[368px] h-[140px] p-3 bg-white rounded-xl border border-mono_100 hover:bg-mono_100 transition cursor-pointer shadow-sm"
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedGym(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedGym(idx);
                    }
                  }}
                >
                  <div className="flex flex-col justify-center gap-1 w-[65%] h-full">
                    <h3 className="text-[20px] font-medium font-pretendard text-mono_700">
                      비헬씨 서초점 {idx}
                    </h3>
                    <div className="flex items-center text-[14px] text-mono_400 font-pretendard">
                      <MapPinIcon className="w-3 h-3 mr-1" /> 서울시 강남구
                      역삼동
                    </div>
                    <div className="flex items-center text-[14px] gap-2 font-pretendard">
                      <span className="text-[#5BA744] font-medium">
                        ● 운영중
                      </span>{' '}
                      |
                      <span className="text-mono_400 font-normal">
                        09:00 ~ 22:00
                      </span>
                    </div>
                    <div className="flex items-center text-[14px] text-mono_400 font-normal font-pretendard">
                      <StarIcon className="w-3 h-3 mr-1 text-yellow-400" /> 4.66
                    </div>
                  </div>

                  <Image
                    alt="gym"
                    className="rounded-lg object-cover"
                    height={100}
                    src="/gym_sample.jpg"
                    width={160}
                  />
                </div>
              ))}
              <div className="flex justify-center pt-4">
                <Pagination
                  className="
                    [&_[data-slot=page]]:bg-mono_100 
                    [&_[data-slot=page]]:text-mono_700
                    [&_[data-slot=page][data-selected=true]]:bg-main 
                    [&_[data-slot=page][data-selected=true]]:text-white
                  "
                  page={page}
                  total={totalPages}
                  onChange={setPage}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {selectedGym && (
        <GymDetailPanel
          gym={selectedGym}
          visible={!!selectedGym}
          onClose={() => setSelectedGym(null)}
        />
      )}
    </div>
  );
}
