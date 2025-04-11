'use client';

import { useState } from 'react';

import RoutePanel from '@/components/RoutePanel';

const dummyRoutes = [
  {
    startAddress: '서울 강남구',
    endAddress: '서울 서초구',
    totalTime: 960, // 16분
    totalDistance: 3400,
    totalWalkDistance: 700,
    transferCount: 1,
    steps: [
      {
        mode: 'WALK',
        sectionTime: 180,
        startName: '내 위치',
        endName: '정류장 A',
        route: '',
      },
      {
        mode: 'BUS',
        sectionTime: 360,
        startName: '정류장 A',
        endName: '정류장 B',
        route: '서초 03',
      },
      {
        mode: 'WALK',
        sectionTime: 420,
        startName: '정류장 B',
        endName: '헬스장',
        route: '',
      },
    ],
  },
  {
    startAddress: '서울 강남구',
    endAddress: '서울 서초구',
    totalTime: 780,
    totalDistance: 2900,
    totalWalkDistance: 600,
    transferCount: 0,
    steps: [
      {
        mode: 'WALK',
        sectionTime: 300,
        startName: '내 위치',
        endName: '정류장 X',
        route: '',
      },
      {
        mode: 'SUBWAY',
        sectionTime: 300,
        startName: '역삼역',
        endName: '강남역',
        route: '2호선',
      },
      {
        mode: 'WALK',
        sectionTime: 180,
        startName: '강남역',
        endName: '헬스장',
        route: '',
      },
    ],
  },
];

export default function RoutePanelTest() {
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);

  return (
    <div className="relative w-screen h-screen bg-gray-100">
      <RoutePanel
        endAddress={dummyRoutes[selectedRouteIndex].endAddress}
        routeList={dummyRoutes}
        selectedRouteIndex={selectedRouteIndex}
        startAddress={dummyRoutes[selectedRouteIndex].startAddress}
        steps={dummyRoutes[selectedRouteIndex].steps}
        totalDistance={dummyRoutes[selectedRouteIndex].totalDistance}
        totalTime={dummyRoutes[selectedRouteIndex].totalTime}
        totalWalkDistance={dummyRoutes[selectedRouteIndex].totalWalkDistance}
        transferCount={dummyRoutes[selectedRouteIndex].transferCount}
        onClose={() => alert('닫기')}
        onSelectRoute={setSelectedRouteIndex}
      />
    </div>
  );
}
