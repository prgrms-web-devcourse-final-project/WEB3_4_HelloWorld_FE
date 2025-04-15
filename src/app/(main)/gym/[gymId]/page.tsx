'use client';

import type { GymDetailResponse } from '@/types/gym';

import Script from 'next/script';
import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Bars3Icon, MapPinIcon, HomeIcon } from '@heroicons/react/24/outline';
import {
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
} from '@heroui/react';

import { fetchGymDetail } from '@/apis/gymApi';
import GymDetailPanel from '@/components/GymDetailPanel';
import RoutePanel from '@/components/RoutePanel';

export default function GymDetailPage() {
  const { gymId } = useParams();
  const router = useRouter();

  const [gymData, setGymData] = useState<GymDetailResponse | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const myMarkerRef = useRef<any>(null);
  const polylineRef = useRef<any[]>([]);

  const [myLocation, setMyLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [routeList, setRouteList] = useState<any[]>([]);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [isRouteVisible, setIsRouteVisible] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setMyLocation({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
        },
        (err) => console.error('현재 위치 접근 실패:', err),
      );
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!gymId) return;
      const data = await fetchGymDetail(Number(gymId));

      setGymData(data);
    };

    fetchData();
  }, [gymId]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.Tmapv2 && mapRef.current && gymData) {
        clearInterval(interval);

        const lat = parseFloat(gymData.yField);
        const lon = parseFloat(gymData.xField);

        const map = new window.Tmapv2.Map(mapRef.current, {
          center: new window.Tmapv2.LatLng(lat, lon),
          width: '100%',
          height: '100%',
          zoom: 15,
          httpsMode: true,
        });

        mapInstanceRef.current = map;

        new window.Tmapv2.Marker({
          position: new window.Tmapv2.LatLng(lat, lon),
          icon: '/gym/icons/mapmarker.svg',
          iconSize: new window.Tmapv2.Size(46, 50),
          offset: new window.Tmapv2.Point(23, 50),
          map,
        });

        new window.Tmapv2.InfoWindow({
          position: new window.Tmapv2.LatLng(lat, lon),
          content: `<div style="white-space: nowrap; padding: 4px 8px; background: white; border-radius: 6px; font-size: 13px; font-weight: bold; box-shadow: 1px 1px 4px rgba(0,0,0,0.2);">${gymData.gymName}</div>`,
          type: 2,
          background: true,
          border: '0px',
          map,
        });

        if (myLocation) {
          new window.Tmapv2.Marker({
            position: new window.Tmapv2.LatLng(myLocation.lat, myLocation.lon),
            icon: '/gym/icons/mapmarker.png',
            iconSize: new window.Tmapv2.Size(36, 36),
            offset: new window.Tmapv2.Point(18, 36),
            map,
          });

          new window.Tmapv2.InfoWindow({
            position: new window.Tmapv2.LatLng(myLocation.lat, myLocation.lon),
            content: `<div style="white-space: nowrap; padding: 4px 8px; background: white; border-radius: 6px; font-size: 13px; font-weight: bold; box-shadow: 1px 1px 4px rgba(0,0,0,0.2);">내 위치</div>`,
            type: 2,
            background: true,
            border: '0px',
            map,
          });
        }
      }
    }, 200);

    return () => clearInterval(interval);
  }, [gymData, myLocation]);

  useEffect(() => {
    if (!isRouteVisible || routeList.length === 0 || !mapInstanceRef.current)
      return;

    const selectedRoute = routeList[selectedRouteIndex];
    const map = mapInstanceRef.current;

    polylineRef.current.forEach((line) => line?.setMap?.(null));
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

        if (leg.mode === 'BUS') color = '#2DB400';
        if (leg.mode === 'SUBWAY') color = '#0078FF';

        return new window.Tmapv2.Polyline({
          path: coords,
          strokeColor: color,
          strokeWeight: 5,
          map,
        });
      })
      .filter(Boolean);

    polylineRef.current = newPolylines;

    if (allCoords.length > 0) {
      const avgLat =
        allCoords.reduce((sum, c) => sum + c.lat(), 0) / allCoords.length;
      const avgLon =
        allCoords.reduce((sum, c) => sum + c.lng(), 0) / allCoords.length;

      map.setCenter(new window.Tmapv2.LatLng(avgLat, avgLon));
    }
  }, [selectedRouteIndex, routeList, isRouteVisible]);

  const fetchRoute = async () => {
    if (!myLocation || !gymData) return;

    try {
      const res = await fetch('https://apis.openapi.sk.com/transit/routes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          appKey: process.env.NEXT_PUBLIC_TMAP_APP_KEY || '',
        },
        body: JSON.stringify({
          startX: myLocation.lon.toString(),
          startY: myLocation.lat.toString(),
          endX: gymData.xField,
          endY: gymData.yField,
          lang: 0,
          format: 'json',
        }),
      });

      const data = await res.json();
      const routes = data.metaData?.plan?.itineraries;

      if (!routes) return;

      const formattedRoutes = routes.map((itinerary: any) => ({
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

      setRouteList(formattedRoutes);
      setSelectedRouteIndex(0);
      setIsRouteVisible(true);
    } catch (err) {
      console.error('경로 요청 실패:', err);
    }
  };

  if (!gymData) return null;

  return (
    <div className="relative w-screen h-screen">
      <Script
        src="https://topopentile1.tmap.co.kr/scriptSDKV2/tmapjs2.min.js"
        strategy="afterInteractive"
      />
      <div ref={mapRef} className="absolute inset-0 z-0" />

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        <Dropdown>
          <DropdownTrigger>
            <Button className="text-sm shadow-md" color="primary" radius="full">
              <Bars3Icon className="w-6 h-6" /> 위치 메뉴
            </Button>
          </DropdownTrigger>

          <DropdownMenu
            aria-label="위치 옵션 선택"
            onAction={(key) => {
              if (
                key === 'go-my-location' &&
                myLocation &&
                mapInstanceRef.current
              ) {
                mapInstanceRef.current.setCenter(
                  new window.Tmapv2.LatLng(myLocation.lat, myLocation.lon),
                );
              }
              if (
                key === 'go-gym-location' &&
                gymData &&
                mapInstanceRef.current
              ) {
                const lat = parseFloat(gymData.yField);
                const lon = parseFloat(gymData.xField);

                mapInstanceRef.current.setCenter(
                  new window.Tmapv2.LatLng(lat, lon),
                );
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
              key="go-gym-location"
              startContent={<MapPinIcon className="w-4 h-4 text-mono_700" />}
            >
              헬스장 위치로 이동
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <GymDetailPanel
        gymId={gymData.gymId}
        map={mapInstanceRef.current}
        myLocation={myLocation}
        panelTranslateX="translate-x-[16px]"
        visible={true}
        onClose={() => router.push('/gym')}
        onRouteReady={(routes) => {
          setRouteList(routes);
          setSelectedRouteIndex(0);
          setIsRouteVisible(true);
        }}
      />

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
          }}
          onSelectRoute={(index) => setSelectedRouteIndex(index)}
        />
      )}
    </div>
  );
}
