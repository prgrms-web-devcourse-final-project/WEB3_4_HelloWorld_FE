'use client';

import Image from 'next/image';
import { XMarkIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

interface RouteStep {
  mode: string;
  sectionTime: number;
  startName: string;
  endName: string;
  route?: string;
}

interface RoutePanelProps {
  startAddress: string;
  endAddress: string;
  totalTime: number;
  totalDistance: number;
  totalWalkDistance: number;
  transferCount: number;
  steps: RouteStep[];
  onClose: () => void;
  routeList: {
    startAddress: string;
    endAddress: string;
    totalTime: number;
    totalDistance: number;
    totalWalkDistance: number;
    transferCount: number;
    steps: RouteStep[];
  }[];
  selectedRouteIndex: number;
  onSelectRoute: (index: number) => void;
}

function formatTime(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  const hour = date.getHours();
  const minute = `${date.getMinutes()}`.padStart(2, '0');
  const period = hour < 12 ? '오전' : '오후';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;

  return `${year}년 ${month}월 ${day}일 ${period} ${displayHour}:${minute} 출발`;
}

function getArrivalTime(start: Date, minutesToAdd: number) {
  const arrival = new Date(start.getTime() + minutesToAdd * 60000);
  const hour = arrival.getHours();
  const minute = `${arrival.getMinutes()}`.padStart(2, '0');
  const period = hour < 12 ? '오전' : '오후';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;

  return `${period} ${displayHour}:${minute}`;
}

export default function RoutePanel({
  startAddress,
  endAddress,
  routeList,
  selectedRouteIndex,
  onSelectRoute,
  onClose,
}: RoutePanelProps) {
  const now = new Date();

  return (
    <div className="absolute top-[80px] left-[20px] h-[calc(100%-96px)] w-[440px] bg-white rounded-2xl shadow-2xl z-10 flex flex-col overflow-hidden transition-transform duration-500 ease-in-out translate-x-[440px]">
      <button
        className="absolute top-2 right-2 z-20 hover:opacity-70 transition"
        onClick={onClose}
      >
        <XMarkIcon className="w-8 h-8 text-mono_700" />
      </button>

      {/* 상단 제목 */}
      <div className="p-4 border-b border-mono_200">
        <h3 className="text-[18px] font-bold text-mono_800 mb-1">
          {startAddress} → {endAddress}
        </h3>
        <p className="text-sm text-mono_500">{formatTime(now)}</p>
      </div>

      {/* 경로 카드 리스트 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-mono_300">
        {routeList.map((route, index) => {
          const isSelected = selectedRouteIndex === index;
          const minutes = Math.ceil(route.totalTime / 60);
          const arrivalTime = getArrivalTime(now, minutes);

          return (
            <button
              key={index}
              className={`w-full text-left p-4 rounded-xl shadow-md transition border focus:outline-none ${
                isSelected
                  ? 'border-main bg-white'
                  : 'border-mono_200 bg-mono_100 hover:bg-white'
              }`}
              tabIndex={0}
              onClick={() => onSelectRoute(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onSelectRoute(index);
              }}
            >
              {/* 상단 요약 */}
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-mono_800">
                    <span className="text-[24px] font-bold">{minutes}</span>
                    <span className="text-[14px] font-medium ml-[1px]">분</span>
                  </span>
                  <span className="text-mono_300">|</span>
                  <span className="text-[14px] text-mono_600">
                    {arrivalTime} 도착
                  </span>
                  <span className="text-mono_300">|</span>
                  <span className="text-[14px] text-mono_600">1,350원</span>
                </div>
              </div>

              {/* 경로 바 시각화 */}
              <div className="w-full h-4 my-6 bg-gray-400 rounded-full relative overflow-visible">
                {(() => {
                  const seenModes = new Set<string>();
                  let accumulatedLeft = 0;

                  const colors: Record<string, string> = {
                    WALK: 'bg-gray-400',
                    BUS: 'bg-green-400',
                    SUBWAY: 'bg-blue-400',
                  };

                  const iconSrc: Record<string, string> = {
                    WALK: '/gym/routepanel/walk.svg',
                    BUS: '/gym/routepanel/bus.svg',
                    SUBWAY: '/gym/routepanel/subway.svg',
                  };

                  return route.steps.map((step, i) => {
                    const widthPercent =
                      (step.sectionTime / route.totalTime) * 100;
                    const minutes = Math.round(step.sectionTime / 60);
                    const showIcon = !seenModes.has(step.mode);

                    seenModes.add(step.mode);

                    const segment = (
                      <div
                        key={i}
                        className={`absolute top-0 h-full z-10 flex items-center justify-center text-[10px] text-white font-medium ${step.mode !== 'WALK' ? colors[step.mode] : ''} rounded-full`}
                        style={{
                          width: `${widthPercent}%`,
                          left: `${accumulatedLeft}%`,
                          minWidth: widthPercent < 10 ? '36px' : undefined,
                        }}
                      >
                        {minutes > 0 ? `${minutes}분` : ''}

                        {/* 아이콘 */}
                        {showIcon && (
                          <div
                            className={`absolute z-20 w-6 h-6 rounded-full flex items-center justify-center shadow-md ${colors[step.mode]}`}
                            style={{
                              top: '50%',
                              left: '0%',
                              transform: 'translate(-50%, -50%)',
                            }}
                          >
                            <Image
                              alt={`${step.mode} icon`}
                              height={14}
                              src={iconSrc[step.mode]}
                              width={14}
                            />
                          </div>
                        )}
                      </div>
                    );

                    accumulatedLeft += widthPercent;

                    return segment;
                  });
                })()}
              </div>

              {/* 요약 정보 */}
              <div className="text-[13px] text-mono_600 flex gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Image
                    alt="도보 아이콘"
                    height={16}
                    src="/gym/routepanel/walk.svg"
                    width={16}
                  />
                  도보 {route.totalWalkDistance}m
                </div>
                <div className="flex items-center gap-1">
                  <ArrowPathIcon className="w-4 h-4 text-mono_500" />
                  환승 {route.transferCount}회
                </div>
              </div>

              <div className="my-4 border-t border-mono_200" />

              {/* 상세 경로 */}
              <ul className="mt-4 space-y-2 text-[13px] text-mono_700">
                <li className="font-semibold text-main">
                  ● 출발 ({route.steps[0].startName})
                </li>
                {route.steps.map((step, i) => (
                  <li key={i} className="ml-3 pl-2 border-l border-mono_300">
                    {step.mode === 'WALK' && (
                      <span>
                        🚶 도보 {(step.sectionTime / 60).toFixed(0)}분 →{' '}
                        {step.endName}
                      </span>
                    )}
                    {step.mode === 'BUS' && (
                      <span>
                        🚌 {step.route} → {step.endName} (
                        {(step.sectionTime / 60).toFixed(0)}분)
                      </span>
                    )}
                    {step.mode === 'SUBWAY' && (
                      <span>
                        🚇 {step.route} → {step.endName} (
                        {(step.sectionTime / 60).toFixed(0)}분)
                      </span>
                    )}
                  </li>
                ))}
                <li className="font-semibold text-main mt-2">
                  ● 도착 ({route.steps[route.steps.length - 1].endName})
                </li>
              </ul>
            </button>
          );
        })}
      </div>
    </div>
  );
}
