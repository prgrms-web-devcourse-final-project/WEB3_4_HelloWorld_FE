'use client';

import type { GymType } from '@/types/gym';

import { useEffect, useRef, useState } from 'react';
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Bars3Icon,
  HomeIcon,
  MapIcon,
} from '@heroicons/react/24/outline';
import Script from 'next/script';
import { MapPinIcon, StarIcon } from '@heroicons/react/24/solid';
import { Input, Pagination } from '@heroui/react';
import { Image, Switch, Select, SelectItem } from '@heroui/react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@heroui/react';
import Lottie from 'lottie-react';

import { MyButton } from '@/components/atoms/Button';
import GymDetailPanel from '@/components/GymDetailPanel';
import RoutePanel from '@/components/RoutePanel';
import { fetchFilteredGymList } from '@/apis/gymApi';
import { isGymOpenNow } from '@/utils/time';
import emptyAnimation from '@/assets/lottie/empty.json';
declare global {
  interface Window {
    Tmapv2: any;
  }

  namespace Tmapv2 {
    class LatLng {
      constructor(lat: number, lon: number);
      lat(): number;
      lng(): number;
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

  const [gymList, setGymList] = useState<GymType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isOpen, setIsOpen] = useState(true);
  const [selectedGym, setSelectedGym] = useState<GymType | null>(null);
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [realMyLocation, setRealMyLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
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

  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState<
    'none' | 'trainer' | 'district'
  >('none');

  const [mapCenter, setMapCenter] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const [searchedLocation, setSearchedLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  // 헬스장 API 호출
  const fetchAndSetGyms = async () => {
    if (!myLocation) return;

    try {
      const res = await fetchFilteredGymList({
        sortOption: selected,
        searchOption,
        searchTerm,
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

  const centerMarkerRef = useRef<Tmapv2.Marker | null>(null);
  const mapCenterMarkerRef = useRef<any>(null);
  const centerInfoWindowRef = useRef<any>(null);

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

      marker.addListener('click', () => {
        setSelectedGym(gym);
        focusGymWithOffset(lat, lon); // 위치 보정
      });

      markersRef.current.push({ marker, infoWindow });
    });
  };

  // ✅ 위치 기반 헬스장 조회
  useEffect(() => {
    if (myLocation) fetchAndSetGyms();
  }, [myLocation, selected, isPartnerOnly, page, searchTerm, searchOption]);

  useEffect(() => {
    if (!mapInstanceRef.current || gymList.length === 0) return;

    const map = mapInstanceRef.current;

    const latSum = gymList.reduce(
      (sum, gym) => sum + parseFloat(gym.yField),
      0,
    );
    const lonSum = gymList.reduce(
      (sum, gym) => sum + parseFloat(gym.xField),
      0,
    );
    const avgLat = latSum / gymList.length;
    const avgLon = lonSum / gymList.length;

    // 지도의 중심 이동
    map.setCenter(new window.Tmapv2.LatLng(avgLat, avgLon));
  }, [gymList]);

  useEffect(() => {
    if (!mapInstanceRef.current || gymList.length === 0) return;

    const map = mapInstanceRef.current;

    // 줌 변경 핸들러는 거리순일 때만 적용
    const handleZoomChanged = () => {
      const zoom = map.getZoom();

      if (selected === 'nearby') {
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
      }
    };

    map.addListener('zoom_changed', handleZoomChanged);

    // ✅ 평점순도 포함해서 마커 찍기
    createNearbyMarkers(map, gymList);

    // 기본 줌 체크 (nearby 일 때만 필요)
    if (selected === 'nearby') {
      handleZoomChanged();
    }

    return () => {
      if (map?.removeListener && typeof map.removeListener === 'function') {
        map.removeListener('zoom_changed', handleZoomChanged);
      }

      markersRef.current.forEach(({ marker, infoWindow }) => {
        try {
          marker?.setMap?.(null);
          infoWindow?.setMap?.(null);
        } catch (e) {
          console.warn('마커 정리 중 에러:', e);
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

        // ✅ 지도 이동 후 중심 좌표 업데이트
        map.addListener('dragend', () => {
          const center = map.getCenter();

          setMapCenter({ lat: center.lat(), lon: center.lng() });
        });

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const lat = position.coords.latitude;
              const lon = position.coords.longitude;

              setRealMyLocation({ lat, lon });
              setMyLocation({ lat, lon });

              const marker = new window.Tmapv2.Marker({
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
                        ${buildingName || '현재 위치'}
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
    polylineRef.current.forEach((line) => {
      try {
        line?.setMap?.(null);
      } catch (e) {
        console.warn('polyline 제거 실패:', e);
      }
    });
    polylineRef.current = [];

    const allCoords: Tmapv2.LatLng[] = [];

    const newPolylines: any[] = selectedRoute.legs
      .map((leg: any) => {
        const linestring = leg.passShape?.linestring;

        if (!linestring) return null;

        const coords = linestring.split(' ').map((point: string) => {
          const [lon, lat] = point.split(',').map(Number);
          const latlng = new window.Tmapv2.LatLng(lat, lon);

          allCoords.push(latlng);

          return latlng;
        });

        let color = '#999999';

        if (leg.mode === 'BUS') color = '#0078FF';
        if (leg.mode === 'SUBWAY') color = '#2DB400';

        return new window.Tmapv2.Polyline({
          path: coords,
          strokeColor: color,
          strokeWeight: 5,
          map,
        });
      })
      .filter(Boolean); // null 제거

    polylineRef.current = newPolylines;

    // 중심 이동
    if (allCoords.length > 0) {
      const avgLat =
        allCoords.reduce((sum, c) => sum + c.lat(), 0) / allCoords.length;
      const avgLon =
        allCoords.reduce((sum, c) => sum + c.lng(), 0) / allCoords.length;

      focusGymWithOffset(map, avgLat, avgLon); // ✅ 중앙 포커싱 (좌측 보정 포함)
    }
  }, [selectedRouteIndex, routeList, isRouteVisible]);

  const HeroSwitch = Switch as any;

  const focusGymWithOffset = (
    lat: number,
    lon: number,
    offsetX: number = 100,
  ) => {
    const map = mapInstanceRef.current;

    if (!map) return;

    const projection = map.getProjection?.();

    if (!projection) return;

    const point = projection.fromLatLngToPoint(
      new window.Tmapv2.LatLng(lat, lon),
    );
    const adjustedPoint = new window.Tmapv2.Point(
      point.x - offsetX / map.getZoom(),
      point.y,
    );
    const adjustedLatLng = projection.fromPointToLatLng(adjustedPoint);

    map.setCenter(adjustedLatLng);
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
          {/* 검색어 입력창 */}
          <div className="flex items-center gap-2">
            <Select
              aria-label="검색 카테고리"
              className="w-[130px] text-sm"
              selectedKeys={new Set([searchOption])}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as
                  | 'none'
                  | 'district'
                  | 'trainer';

                setSearchOption(selected);
              }}
            >
              <SelectItem key="none">전체 검색</SelectItem>
              <SelectItem key="district">지역 검색</SelectItem>
              <SelectItem key="trainer">트레이너 검색</SelectItem>
            </Select>

            <Input
              className="flex-1"
              endContent={
                <MagnifyingGlassIcon className="w-5 h-5 text-mono_400" />
              }
              placeholder="검색어 입력"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setPage(1);
                  fetchAndSetGyms();
                }
              }}
            />
          </div>

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
          {selected === 'nearby' && (
            <div className="flex items-center gap-1 pt-2 pb-3 border-b border-mono_200">
              <MapPinIcon className="w-4 h-4 text-main" />
              <div className="text-sm">
                {userAddress ? (
                  <>
                    <span className="text-mono_700 font-semibold">
                      {userAddress}
                    </span>
                    <span className="text-mono_400 font-normal">
                      {' '}
                      기준으로 가까운 헬스장들을 모아봤어요!
                    </span>
                  </>
                ) : (
                  <span className="text-mono_400 font-normal">
                    위치 정보를 불러오는 중...
                  </span>
                )}
              </div>
            </div>
          )}
          <div className="flex-1 overflow-y-auto space-y-4 pb-4 scrollbar-thin scrollbar-thumb-rounded-xl scrollbar-track-transparent scrollbar-thumb-mono_200 transition-all duration-300 [&:active]:scrollbar-thumb-mono_300">
            {gymList.length > 0 ? (
              <>
                {gymList.map((gym) => (
                  <div
                    key={gym.gymId}
                    className="flex items-center justify-between w-[368px] h-[140px] p-3 bg-white rounded-xl border border-mono_100 hover:bg-mono_100 transition cursor-pointer shadow-sm"
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      setSelectedGym(gym);
                      focusGymWithOffset(
                        parseFloat(gym.yField),
                        parseFloat(gym.xField),
                      );
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ')
                        setSelectedGym(gym);
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
                        <span
                          className={`${
                            isGymOpenNow(gym.startTime, gym.endTime)
                              ? 'text-[#5BA744]'
                              : 'text-red-500'
                          } font-medium`}
                        >
                          ●{' '}
                          {isGymOpenNow(gym.startTime, gym.endTime)
                            ? '운영중'
                            : '운영 종료'}
                        </span>{' '}
                        |{' '}
                        <span className="text-mono_400 font-normal">
                          {gym.startTime === '00:00' && gym.endTime === '24:00'
                            ? '24시간 운영'
                            : `${gym.startTime} ~ ${gym.endTime}`}
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
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-4 mt-10">
                <Lottie
                  animationData={emptyAnimation}
                  className="w-[260px] h-[260px]"
                  loop={true}
                />
                <p className="text-mono_400 text-[16px] font-semibold text-center">
                  찾으시는 조건에 맞는 헬스장이 없어요. <br />
                  다른 키워드는 어떠세요?
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {mapCenter &&
        (mapCenter.lat !== myLocation?.lat ||
          mapCenter.lon !== myLocation?.lon) && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  className="text-sm shadow-md"
                  color="primary"
                  radius="full"
                >
                  <Bars3Icon className="w-6 h-6" />
                  위치 메뉴
                </Button>
              </DropdownTrigger>

              <DropdownMenu
                aria-label="위치 옵션 선택"
                onAction={(key) => {
                  if (key === 'go-my-location') {
                    if (!realMyLocation || !mapInstanceRef.current) return;
                    mapInstanceRef.current.setCenter(
                      new window.Tmapv2.LatLng(
                        realMyLocation.lat,
                        realMyLocation.lon,
                      ),
                    );
                  }
                  if (key === 'go-searched-location') {
                    if (!searchedLocation || !mapInstanceRef.current) return;
                    mapInstanceRef.current.setCenter(
                      new window.Tmapv2.LatLng(
                        searchedLocation.lat,
                        searchedLocation.lon,
                      ),
                    );
                  }
                  if (key === 'search-here') {
                    // 👇 기존 "현재 위치에서 검색" 버튼 코드 복사
                    if (!mapCenter || !mapInstanceRef.current) return;

                    fetch(
                      `https://apis.openapi.sk.com/tmap/geo/reversegeocoding?version=1&lat=${mapCenter.lat}&lon=${mapCenter.lon}&coordType=WGS84GEO&addressType=A04`,
                      {
                        method: 'GET',
                        headers: {
                          appKey: process.env.NEXT_PUBLIC_TMAP_APP_KEY || '',
                        },
                      },
                    )
                      .then((res) => res.json())
                      .then((data) => {
                        const address = data?.addressInfo?.fullAddress;

                        if (mapCenterMarkerRef.current)
                          mapCenterMarkerRef.current.setMap(null);
                        if (centerInfoWindowRef.current)
                          centerInfoWindowRef.current.setMap(null);

                        const marker = new window.Tmapv2.Marker({
                          position: new window.Tmapv2.LatLng(
                            mapCenter.lat,
                            mapCenter.lon,
                          ),
                          icon: '/gym/icons/mapmarker.png',
                          iconSize: new window.Tmapv2.Size(36, 36),
                          offset: new window.Tmapv2.Point(18, 36),
                          map: mapInstanceRef.current,
                        });

                        mapCenterMarkerRef.current = marker;

                        const popupContent = `
                          <div style="width: 230px; background-color: white; padding: 12px 14px; border-radius: 10px; box-shadow: 2px 2px 10px rgba(0,0,0,0.15); font-family: Pretendard, sans-serif; font-size: 13px; color: #333;">
                            <div style="font-weight: 600; margin-bottom: 6px;">선택한 위치</div>
                            <div>${address || '-'}</div>
                          </div>
                        `;

                        const infoWindow = new window.Tmapv2.InfoWindow({
                          position: new window.Tmapv2.LatLng(
                            mapCenter.lat,
                            mapCenter.lon,
                          ),
                          content: popupContent,
                          type: 2,
                          background: false,
                          border: '0px',
                          map: mapInstanceRef.current,
                        });

                        centerInfoWindowRef.current = infoWindow;

                        setUserAddress(address || null);
                        setMyLocation(mapCenter);
                        setSearchedLocation(mapCenter);
                      })
                      .catch((err) => {
                        console.error('지도 중심 주소 가져오기 실패:', err);
                      });
                  }
                  if (key === 'search-my-location') {
                    if (!realMyLocation || !mapInstanceRef.current) return;

                    fetch(
                      `https://apis.openapi.sk.com/tmap/geo/reversegeocoding?version=1&lat=${realMyLocation.lat}&lon=${realMyLocation.lon}&coordType=WGS84GEO&addressType=A04`,
                      {
                        method: 'GET',
                        headers: {
                          appKey: process.env.NEXT_PUBLIC_TMAP_APP_KEY || '',
                        },
                      },
                    )
                      .then((res) => res.json())
                      .then((data) => {
                        const address = data?.addressInfo?.fullAddress;

                        // ✅ 마커 추가/제거는 하지 않음
                        mapInstanceRef.current?.setCenter(
                          new window.Tmapv2.LatLng(
                            realMyLocation.lat,
                            realMyLocation.lon,
                          ),
                        );

                        setUserAddress(address || null);
                        setMyLocation(realMyLocation);
                        setSearchedLocation(realMyLocation);
                      })
                      .catch((err) => {
                        console.error('내 위치 기준 주소 가져오기 실패:', err);
                      });
                  }
                }}
              >
                <DropdownItem
                  key="go-my-location"
                  startContent={<HomeIcon className="w-4 h-4 text-mono_700" />}
                >
                  내 위치로 이동
                </DropdownItem>
                <DropdownItem
                  key="search-my-location"
                  startContent={<MapIcon className="w-4 h-4 text-mono_700" />}
                >
                  내 위치에서 검색
                </DropdownItem>

                <DropdownItem
                  key="go-searched-location"
                  startContent={
                    <MapPinIcon className="w-4 h-4 text-mono_700" />
                  }
                >
                  선택한 위치로 이동
                </DropdownItem>

                <DropdownItem
                  key="search-here"
                  startContent={
                    <MagnifyingGlassIcon className="w-4 h-4 text-mono_700" />
                  }
                >
                  현재 위치에서 검색
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )}

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
