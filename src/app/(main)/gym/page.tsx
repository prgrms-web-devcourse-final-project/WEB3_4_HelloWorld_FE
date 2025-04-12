'use client';

import type { GymType } from '@/types/gym';

import { useEffect, useRef, useState } from 'react';
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import Script from 'next/script';
import { MapPinIcon, StarIcon } from '@heroicons/react/24/solid';
import { Input, Pagination } from '@heroui/react';
import { Image, Switch } from '@heroui/react';

import { MyButton } from '@/components/atoms/Button';
import GymDetailPanel from '@/components/GymDetailPanel';
import RoutePanel from '@/components/RoutePanel';
import { fetchGymList } from '@/apis/gymApi';

declare global {
  interface Window {
    Tmapv2: any;
  }

  namespace Tmapv2 {
    class LatLng {
      constructor(lat: number, lon: number);
    }

    class Marker {
      constructor(options: {
        position: LatLng;
        icon?: string;
        iconSize?: Size;
        offset?: Point;
        map?: any;
      });
      setMap(map: any): void;
    }

    class InfoWindow {
      constructor(options: {
        position: LatLng;
        content: string;
        type?: number;
        background?: boolean;
        border?: string;
        map?: any;
      });
      setMap(map: any): void;

      // ✅ 요거 추가
      setVisible(visible: boolean): void;
    }

    class Map {
      constructor(
        div: HTMLElement,
        options: {
          center: LatLng;
          width: string;
          height: string;
          zoom: number;
          httpsMode: boolean;
        },
      );
      setMapType(type: any): void;
      setCenter(latlng: LatLng): void;
      setZoom(level: number): void;
      getZoom(): number;
      addListener(event: string, handler: () => void): void;
      removeListener(event: string, handler: () => void): void;
    }

    class Size {
      constructor(width: number, height: number);
    }

    class Point {
      constructor(x: number, y: number);
    }

    class Polyline {
      constructor(options: {
        path: LatLng[];
        strokeColor: string;
        strokeWeight: number;
        map: any;
      });
      setMap(map: any): void;
    }
  }
}

export default function GymPage() {
  const [selected, setSelected] = useState<'score' | 'nearby'>('nearby');
  const [isPartnerOnly, setIsPartnerOnly] = useState(true);

  // const gyms = dummyGyms;
  // const [page, setPage] = useState(1);
  // const perPage = 6;
  // const totalPages = Math.ceil(gyms.length / perPage);
  // const currentList = gyms.slice((page - 1) * perPage, page * perPage);

  const [gymList, setGymList] = useState<GymType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // const [isOpen, setIsOpen] = useState(true);
  // const [selectedGym, setSelectedGym] = useState<(typeof gyms)[0] | null>(null);
  // const [isPanelVisible, setIsPanelVisible] = useState(false);

  // const [userAddress, setUserAddress] = useState<string | null>(null);
  // const mapRef = useRef<HTMLDivElement>(null);
  // const mapInstanceRef = useRef<any>(null);
  // const [isRouteVisible, setIsRouteVisible] = useState(false);
  // const [isRouteMode, setIsRouteMode] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [selectedGym, setSelectedGym] = useState<GymType | null>(null);
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [myLocation, setMyLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<
    {
      marker: Tmapv2.Marker;
      infoWindow: Tmapv2.InfoWindow;
    }[]
  >([]);

  const [isRouteVisible, setIsRouteVisible] = useState(false);
  const [isRouteMode, setIsRouteMode] = useState(false);

  const detailPanelX = isRouteMode
    ? 'translate-x-[10px]'
    : isOpen
      ? isPanelVisible
        ? 'translate-x-[440px]'
        : 'translate-x-0'
      : 'translate-x-0';

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

  const [routeList, setRouteList] = useState<any[]>([]);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const polylineRef = useRef<any[]>([]);

  // type RouteData = {
  //   startAddress: string;
  //   endAddress: string;
  //   totalTime: number;
  //   totalDistance: number;
  //   totalWalkDistance: number;
  //   transferCount: number;
  //   steps: {
  //     mode: string;
  //     sectionTime: number;
  //     startName: string;
  //     endName: string;
  //     route: string;
  //   }[];
  //   legs: {
  //     mode: string;
  //     passShape?: { linestring: string };
  //   }[];
  // };

  // const [myLocation, setMyLocation] = useState<{
  //   lat: number;
  //   lon: number;
  // } | null>(null);
  // const polylineRef = useRef<any[]>([]);

  // ✅ 헬스장 API 호출
  const fetchAndSetGyms = async () => {
    if (!myLocation) return;

    try {
      const res = await fetchGymList({
        sortOption: selected,
        searchOption: 'none',
        searchTerm: '',
        page: page - 1,
        pageSize: 6,
        x: String(myLocation.lon),
        y: String(myLocation.lat),
        isPartner: isPartnerOnly,
      });

      setGymList(res.content);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error('[Gym API] 헬스장 불러오기 실패:', err);
    }
  };

  const createNearbyMarkers = (map: Tmapv2.Map, gyms: GymType[]) => {
    // 기존 마커 안전하게 제거
    markersRef.current.forEach(({ marker, infoWindow }) => {
      try {
        if (marker?.setMap) marker.setMap(null);
      } catch (e) {
        console.warn('marker 제거 중 오류:', e);
      }

      try {
        if (infoWindow?.setMap) infoWindow.setMap(null);
      } catch (e) {
        console.warn('infoWindow 제거 중 오류:', e);
      }
    });

    // 초기화
    markersRef.current = [];

    // 새 마커 생성 (이건 기존 그대로 두면 됨)
    gyms.forEach((gym) => {
      const lat = parseFloat(gym.yField);
      const lon = parseFloat(gym.xField);
      const position = new window.Tmapv2.LatLng(lat, lon);

      const marker = new window.Tmapv2.Marker({
        position,
        icon: '/gym/icons/mapmarker.svg',
        iconSize: new window.Tmapv2.Size(46, 50),
        offset: new window.Tmapv2.Point(23, 50),
        map,
      });

      const infoWindow = new window.Tmapv2.InfoWindow({
        position,
        content: `
          <div style="
            white-space: nowrap;
            padding: 4px 8px;
            background: white;
            border-radius: 6px;
            font-size: 13px;
            font-weight: bold;
            box-shadow: 1px 1px 4px rgba(0,0,0,0.2);
          ">
            ${gym.gymName}
          </div>
        `,
        type: 2,
        background: false,
        border: '0px',
        map,
      });

      markersRef.current.push({ marker, infoWindow });
    });
  };

  // ✅ 위치 기반 헬스장 조회
  useEffect(() => {
    if (myLocation) fetchAndSetGyms();
  }, [myLocation, selected, isPartnerOnly, page]);

  useEffect(() => {
    if (!mapInstanceRef.current || selected !== 'nearby') return;

    const map = mapInstanceRef.current;

    const handleZoomChanged = () => {
      const zoom = map.getZoom();

      markersRef.current.forEach(({ infoWindow }) => {
        try {
          if (!infoWindow?.setMap) return;

          if (zoom >= 16) {
            infoWindow.setVisible(true);
          } else {
            infoWindow.setVisible(false);
          }
        } catch (err) {
          console.warn('infoWindow setMap 중 에러 발생:', err);
        }
      });
    };

    map.addListener('zoom_changed', handleZoomChanged);

    // 초기 마커 생성 및 InfoWindow 상태
    createNearbyMarkers(map, gymList);
    handleZoomChanged();

    return () => {
      if (map?.removeListener && typeof map.removeListener === 'function') {
        map.removeListener('zoom_changed', handleZoomChanged);
      }

      markersRef.current.forEach(({ marker, infoWindow }) => {
        try {
          marker?.setMap?.(null);
        } catch (e) {
          console.warn('marker cleanup 실패:', e);
        }

        try {
          infoWindow?.setMap?.(null);
        } catch (e) {
          console.warn('infoWindow cleanup 실패:', e);
        }
      });

      markersRef.current = [];
    };
  }, [gymList, selected]);

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
              // 마커 생성 (더 안정적인 URL)
              const marker = new window.Tmapv2.Marker({
                position: new window.Tmapv2.LatLng(lat, lon),
                icon: '/gym/icons/mapmarker.svg',
                iconSize: new window.Tmapv2.Size(46, 50),
                offset: new window.Tmapv2.Point(23, 50),
                map,
              });

              map.setCenter(new window.Tmapv2.LatLng(lat, lon));
              map.setZoom(15);

              // 주소 가져오기 + 팝업 생성
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
                  console.log('[리버스 지오코딩 응답]', data);
                  const { fullAddress, buildingName } = data?.addressInfo || {};

                  setUserAddress(fullAddress || null);
                  const popupContent = `
                  <div style="
                    width: 230px;
                    background-color: white;
                    padding: 12px 14px;
                    border-radius: 10px;
                    box-shadow: 2px 2px 10px rgba(0,0,0,0.15);
                    font-family: Pretendard, sans-serif;
                    font-size: 13px;
                    color: #333;
                  ">
                    <div style="font-weight: 600; margin-bottom: 6px;">
                      📍 ${buildingName || '현재 위치'}
                    </div>
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
                })
                .catch((err) => {
                  console.error('주소 가져오기 실패:', err.message);
                });
            },
            (err) => {
              console.error('위치 접근 실패:', err.message);
            },
          );
        }
      } else {
        console.log('[TMap] 로딩 중...');
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // 상세 패널 및 길찾기 상태태
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
      const timer = setTimeout(() => {
        setSelectedGym(null);
      }, 500); // transition-duration 과 동일

      return () => clearTimeout(timer);
    }
  }, [isPanelVisible, selectedGym, isRouteMode]);

  useEffect(() => {
    if (!isRouteVisible || routeList.length === 0 || !mapInstanceRef.current)
      return;

    const selectedRoute = routeList[selectedRouteIndex];
    const map = mapInstanceRef.current;

    // 기존 폴리라인 삭제
    if (polylineRef.current.length > 0) {
      polylineRef.current.forEach((line) => {
        try {
          line?.setMap?.(null);
        } catch (e) {
          console.warn('polyline 제거 실패:', e);
        }
      });
      polylineRef.current = [];
    }

    // 새 경로의 각 구간 그리기
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

  const HeroSwitch = Switch as any;

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
          bg-white w-[420px] rounded-tr-2xl rounded-br-2xl shadow-2xl
          flex flex-col gap-4 overflow-hidden
          transition-transform duration-500
          ${sidebarX}
        `}
      >
        <div className="p-5 pt-6 flex flex-col gap-4 h-full">
          <h2 className="text-xl font-bold text-mono_700 font-point flex items-center justify-between">
            오늘의 운동 장소
            <div className="flex items-center gap-2">
              <span className="text-sm text-mono_500">파트너 헬스장</span>
              <HeroSwitch
                isSelected={isPartnerOnly}
                onValueChange={setIsPartnerOnly}
              />
            </div>
          </h2>

          <Input
            endContent={
              <MagnifyingGlassIcon className="w-5 h-5 text-mono_400" />
            }
            placeholder="지역 / 지하철역 / 센터 / 선생님 검색"
            variant="flat"
          />

          <div className="flex gap-2">
            {['거리순', '평점순'].map((label) => (
              <MyButton
                key={label}
                color={
                  selected === (label === '거리순' ? 'nearby' : 'score')
                    ? 'main'
                    : 'mono'
                }
                size="custom"
                onClick={() =>
                  setSelected(label === '거리순' ? 'nearby' : 'score')
                }
              >
                {label}
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
            {gymList.map((gym) => (
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
                initialPage={page}
                total={totalPages}
                onChange={(newPage: number) => setPage(newPage)}
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
          visible={isPanelVisible}
          onClose={() => setIsPanelVisible(false)}
          onRouteReady={(routes) => {
            setRouteList(routes);
            setSelectedRouteIndex(0);
            setIsPanelVisible(false);
            setIsRouteVisible(true);
            setIsRouteMode(true);
          }}
        />
      )}

      {/* 경로 안내 패널 */}
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
          className="absolute top-[50%] left-0 translate-y-[-50%] z-30
          transition-transform duration-500 ease-in-out
          w-8 h-8 shadow-md bg-white border border-mono_200
          flex items-center justify-center hover:bg-mono_100"
          style={{
            transform: `translateX(${isOpen ? (isPanelVisible ? 896 : 436) : 16}px) translateY(-50%)`,
          }}
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
