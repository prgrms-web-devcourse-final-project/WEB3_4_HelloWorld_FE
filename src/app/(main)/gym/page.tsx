'use client';

import { useEffect, useRef, useState } from 'react';
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import Script from 'next/script';
import { MapPinIcon, StarIcon } from '@heroicons/react/24/solid';
import { Input, Pagination } from '@heroui/react';
import { Image } from '@heroui/react';

import { MyButton } from '@/components/atoms/Button';
import GymDetailPanel from '@/components/GymDetailPanel';
import RoutePanel from '@/components/RoutePanel';
import { fetchGymListApi, fetchNearbyGymsApi } from '@/apis/gymApi';
import { GymData } from '@/types/gyms';
import useToast from '@/hooks/useToast';

declare global {
  interface Window {
    Tmapv2: any;
  }
}

export default function GymPage() {
  const [selected, setSelected] = useState('최신순');
  const filters = ['최신순', '평점순', '거리순'];
  const { showToast } = useToast();
  const [gyms, setGyms] = useState<GymData[]>([]);
  const [page, setPage] = useState(1);
  const perPage = 6;
  const totalPages = Math.ceil(gyms.length / perPage);
  const currentList = gyms.slice((page - 1) * perPage, page * perPage);
  const [searchTerm, setSearchTerm] = useState('');

  const [isOpen, setIsOpen] = useState(true);
  const [selectedGym, setSelectedGym] = useState<GymData | null>(null);
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  const [userAddress, setUserAddress] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [isRouteVisible, setIsRouteVisible] = useState(false);
  const [isRouteMode, setIsRouteMode] = useState(false);
  const detailPanelX = isRouteMode
    ? 'translate-x-[10px]'
    : isOpen
      ? isPanelVisible
        ? 'translate-x-[440px]'
        : 'translate-x-0'
      : 'translate-x-0';

  useEffect(() => {
    const fetchGyms = async () => {
      const data = await fetchGymListApi(0, 150);

      setGyms(data);
    };

    fetchGyms();
  }, []);
  const handleSearchSubmit = async (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key !== 'Enter') return;

    if (selected === '거리순') {
      const nearbyGyms = await fetchNearbyGymsApi(searchTerm, 0, 150);

      setGyms(nearbyGyms);
    } else {
      handleSearch(); // 거리순이 아니면 이 함수로 대체
    }
  };

  // 거리순 외 검색 API 요청
  const handleSearch = async () => {
    const data = await fetchGymListApi(0, 150, searchTerm);

    setGyms(data);
    setPage(1);
  };

  // 거리순 필터 클릭
  const handleFilterClick = async (item: string) => {
    setSelected(item);

    if (item === '거리순') {
      const nearbyGyms = await fetchNearbyGymsApi(searchTerm, 0, 150);

      setGyms(nearbyGyms);
    } else {
      handleSearch(); //  거리순 아닌 경우도 통일
    }
  };

  type RouteData = {
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
  };

  const [routeList, setRouteList] = useState<RouteData[]>([]);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);

  const toggleTranslateX = isOpen
    ? isPanelVisible
      ? 'translate-x-[896px]'
      : 'translate-x-[436px]'
    : 'translate-x-[16px]';
  const sidebarX = isRouteMode
    ? '-translate-x-[420px]'
    : isOpen
      ? 'translate-x-0'
      : '-translate-x-[420px]';

  const [myLocation, setMyLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const polylineRef = useRef<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.Tmapv2 && mapRef.current) {
        clearInterval(interval);

        const map = new window.Tmapv2.Map(mapRef.current, {
          center: new window.Tmapv2.LatLng(37.5665, 126.978),
          width: '100%',
          height: '100%',
          zoom: 15,
          httpsMode: true,
        });

        mapInstanceRef.current = map;
        map.setMapType(window.Tmapv2.Map.MapType.ROAD);

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const lat = position.coords.latitude;
              const lon = position.coords.longitude;

              setMyLocation({ lat, lon });
              new window.Tmapv2.Marker({
                position: new window.Tmapv2.LatLng(lat, lon),
                icon: '/gym/icons/mapmarker.svg',
                iconSize: new window.Tmapv2.Size(46, 50),
                offset: new window.Tmapv2.Point(23, 50),
                map,
              });

              map.setCenter(new window.Tmapv2.LatLng(lat, lon));
              map.setZoom(15);

              fetch(
                `https://apis.openapi.sk.com/tmap/geo/reversegeocoding?version=1&lat=${lat}&lon=${lon}&coordType=WGS84GEO&addressType=A04`,
                {
                  method: 'GET',
                  headers: {
                    appKey: process.env.NEXT_PUBLIC_TMAP_APP_KEY || '',
                  },
                },
              )
                .then((res) => res.json())
                .then((data) => {
                  const { fullAddress, buildingName } = data?.addressInfo || {};

                  setUserAddress(fullAddress || null);

                  const popupContent = `
                    <div style="width: 230px; background-color: white; padding: 12px 14px; border-radius: 10px; box-shadow: 2px 2px 10px rgba(0,0,0,0.15); font-family: Pretendard, sans-serif; font-size: 13px; color: #333;">
                      <div style="font-weight: 600; margin-bottom: 6px;">📍 ${buildingName || '현재 위치'}</div>
                      <div>${fullAddress || '-'}</div>
                    </div>
                  `;

                  new window.Tmapv2.InfoWindow({
                    position: new window.Tmapv2.LatLng(lat, lon),
                    content: popupContent,
                    type: 2,
                    background: false,
                    border: '0px',
                    map,
                  });
                });
            },
            (err) => console.error('위치 접근 실패:', err.message),
          );
        }
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedGym) {
      const timer = setTimeout(() => setIsPanelVisible(true), 100);

      return () => clearTimeout(timer);
    } else {
      setIsPanelVisible(false);
    }
  }, [selectedGym]);

  useEffect(() => {
    if (!isPanelVisible && selectedGym && !isRouteMode) {
      const timer = setTimeout(() => setSelectedGym(null), 500);

      return () => clearTimeout(timer);
    }
  }, [isPanelVisible, selectedGym, isRouteMode]);

  useEffect(() => {
    if (!isRouteVisible || routeList.length === 0 || !mapInstanceRef.current)
      return;

    const selectedRoute = routeList[selectedRouteIndex];
    const map = mapInstanceRef.current;

    if (polylineRef.current.length > 0) {
      polylineRef.current.forEach((line) => line.setMap(null));
      polylineRef.current = [];
    }

    if ('legs' in selectedRoute) {
      const legs = selectedRoute.legs;
      const newPolylines: any[] = [];

      legs.forEach((leg: any) => {
        const linestring = leg.passShape?.linestring;

        if (!linestring) return;

        const coords = linestring.split(' ').map((point: string) => {
          const [lon, lat] = point.split(',').map(Number);

          return new window.Tmapv2.LatLng(lat, lon);
        });

        let color = '#999999';

        if (leg.mode === 'BUS') color = '#0078FF';
        if (leg.mode === 'SUBWAY') color = '#2DB400';

        const polyline = new window.Tmapv2.Polyline({
          path: coords,
          strokeColor: color,
          strokeWeight: 5,
          map,
        });

        newPolylines.push(polyline);
      });

      polylineRef.current = newPolylines;
    }
  }, [selectedRouteIndex, routeList, isRouteVisible]);

  const handleRouteReady = (routes: RouteData[]) => {
    setRouteList(routes);
    setSelectedRouteIndex(0);
    setIsRouteVisible(true);
    setIsRouteMode(true);
  };

  return (
    <div className="relative w-screen h-screen">
      {/* TMap SDK 스크립트 */}
      <Script
        src="https://topopentile1.tmap.co.kr/scriptSDKV2/tmapjs2.min.js"
        strategy="afterInteractive"
      />

      {/* TMap 지도 */}
      <div ref={mapRef} className="absolute inset-0 w-full h-full z-0" />

      {/* 사이드바 */}
      <div
        className={`
          absolute top-[64px] left-0 h-[calc(100%-64px)] z-20
          bg-mono_100 w-[420px] rounded-tr-2xl rounded-br-2xl shadow-2xl
          flex flex-col gap-4 overflow-hidden
          transition-transform duration-500
          ${sidebarX}
        `}
      >
        <div className="p-5 pt-6 flex flex-col gap-4 h-full">
          <h2 className="text-xl font-bold text-mono_900 font-point">
            오늘의 운동 장소
          </h2>
          <Input
            endContent={
              <MagnifyingGlassIcon className="w-5 h-5 text-mono_400" />
            }
            placeholder="지역 / 지하철역 / 센터 / 선생님 검색"
            value={searchTerm}
            variant="flat"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') handleSearchSubmit(e);
            }}
          />
          <div className="flex gap-2">
            {filters.map((item) => (
              <MyButton
                key={item}
                color={selected === item ? 'main' : 'mono'}
                size="custom"
                onClick={() => {
                  if (item === '거리순') {
                    const isLoggedIn =
                      typeof window !== 'undefined' &&
                      !!localStorage.getItem('auth');

                    if (!isLoggedIn) {
                      showToast({
                        title: '로그인 후 사용 가능합니다',
                        description: '로그인 후 사용 가능합니다',
                        type: 'danger',
                      });

                      return;
                    }
                  }

                  handleFilterClick(item);
                }}
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
                className="flex items-center justify-between w-[368px] h-[140px] p-3 bg-mono_100 rounded-xl border border-mono_100 hover:bg-mono_100 transition cursor-pointer shadow-sm"
                role="button"
                tabIndex={0}
                onClick={() => {
                  setSelectedGym(gym);

                  const { xField, yField } = gym;

                  if (
                    xField &&
                    yField &&
                    mapInstanceRef.current &&
                    window.Tmapv2
                  ) {
                    const lat = parseFloat(yField);
                    const lon = parseFloat(xField);

                    const newCenter = new window.Tmapv2.LatLng(lat, lon);

                    // 1. 지도 이동
                    mapInstanceRef.current.setCenter(newCenter);
                    mapInstanceRef.current.setZoom(15);

                    // 2. 마커 생성
                    const marker = new window.Tmapv2.Marker({
                      position: newCenter,
                      icon: '/gym/icons/mapmarker.svg',
                      iconSize: new window.Tmapv2.Size(46, 50),
                      offset: new window.Tmapv2.Point(20, 50),
                      map: mapInstanceRef.current,
                    });

                    // 3. 인포윈도우 정의
                    const infoContent = `
                      <div style="padding: 8px 12px; background: white; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.2); font-size: 14px; font-family: Pretendard, sans-serif;">
                        <strong>${gym.gymName}</strong><br/>
                        ${gym.address}<br/>
                        평점: ${gym.avgScore}
                      </div>
                    `;

                    const infoWindow = new window.Tmapv2.InfoWindow({
                      position: newCenter,
                      content: infoContent,
                      type: 2,
                      border: '0px',
                      background: false,
                    });

                    let isInfoOpen = false;

                    // 4. 마커 클릭 시 toggle 동작
                    marker.addListener('click', () => {
                      if (!isInfoOpen) {
                        infoWindow.setMap(mapInstanceRef.current);
                        isInfoOpen = true;
                      } else {
                        infoWindow.setMap(null);
                        isInfoOpen = false;
                      }
                    });
                  }
                }}
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
          map={mapInstanceRef.current}
          myLocation={myLocation}
          panelTranslateX={detailPanelX}
          visible={!!selectedGym}
          onClose={() => setSelectedGym(null)}
          onRouteReady={handleRouteReady}
        />
      )}
      {isRouteVisible && routeList.length > 0 && (
        <RoutePanel
          endAddress={routeList[selectedRouteIndex].endAddress}
          routeList={routeList}
          selectedRouteIndex={selectedRouteIndex}
          startAddress={routeList[selectedRouteIndex].startAddress}
          steps={routeList[selectedRouteIndex].steps}
          totalDistance={routeList[selectedRouteIndex].totalDistance}
          totalTime={routeList[selectedRouteIndex].totalTime}
          totalWalkDistance={routeList[selectedRouteIndex].totalWalkDistance}
          transferCount={routeList[selectedRouteIndex].transferCount}
          onClose={() => {
            setIsRouteVisible(false);
            setRouteList([]);
            setIsRouteMode(false);
          }}
          onSelectRoute={(index) => {
            setSelectedRouteIndex(index);
          }}
        />
      )}

      {/* 사이드바 토글 버튼 */}
      {!isRouteMode && (
        <button
          className={`absolute top-[50%] left-0 translate-x-[${isOpen ? (isPanelVisible ? 896 : 436) : 16}px] translate-y-[-50%] z-30
        transition-transform duration-500 ease-in-out
        w-8 h-8 shadow-md bg-mono_100 border border-mono_200
        flex items-center justify-center hover:bg-mono_100`}
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
      )}
    </div>
  );
}
