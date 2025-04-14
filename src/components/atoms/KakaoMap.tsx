'use client';

import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import useKakaoLoader from '@/hooks/useKaKaoLoader';
import fetcher from '@/utils/apiInstance';
import { GymListResponse } from '@/types/gym';

export default function KakaoMap() {
  useKakaoLoader();
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  const { mutate, data } = useMutation({
    mutationFn: async ({ x, y }: { x: number; y: number }) => {
      return await fetcher<GymListResponse>(`/gym?x=${x}&y=${y}`, {
        method: 'GET',
      });
    },
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setLocation({ lat, lng });
        mutate({ x: lng, y: lat });
      });
    }
  }, [mutate]);
  useEffect(() => {
    if (mapRef.current && data) {
      const bounds = new kakao.maps.LatLngBounds();

      data.content.forEach((point) => {
        bounds.extend(
          new kakao.maps.LatLng(Number(point.yField), Number(point.xField)),
        );
      });
      mapRef.current.setBounds(bounds);
    }
  }, [data]);

  return (
    <Map
      center={{ lat: 37.5665, lng: 126.978 }} // 기본 서울 시청
      className="md:col-span-2 col-span-3 w-full rounded-lg"
      id="map"
      level={3}
      style={{ width: '100%' }}
      onCreate={(map) => (mapRef.current = map)}
    >
      {data?.content?.map((gym) => (
        <MapMarker
          key={gym.gymId}
          position={{
            lat: Number(gym.yField),
            lng: Number(gym.xField),
          }}
          title={gym.gymName}
        />
      ))}
    </Map>
  );
}
