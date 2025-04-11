import { XMarkIcon } from '@heroicons/react/24/solid';

interface RouteStep {
  mode: string;
  sectionTime: number;
  startName: string;
  endName: string;
  route?: string; // subway line name or bus number
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
}

export default function RoutePanel({
  startAddress,
  endAddress,
  totalTime,
  totalDistance,
  totalWalkDistance,
  transferCount,
  steps,
  onClose,
}: RoutePanelProps) {
  return (
    <div
      className="
        absolute top-[80px] left-0 h-[calc(100%-96px)] w-[440px]
        bg-white rounded-2xl shadow-2xl z-10 flex flex-col overflow-hidden
        transition-transform duration-500 ease-in-out translate-x-[440px]
      "
    >
      <button
        className="absolute top-2 right-2 z-20 hover:opacity-70 transition"
        onClick={onClose}
      >
        <XMarkIcon className="w-8 h-8 text-mono_700" />
      </button>

      <div className="p-4 border-b border-mono_200">
        <h3 className="text-[20px] font-bold text-mono_800">🚍 길찾기 안내</h3>
        <p className="text-[14px] text-mono_600 mt-1">
          <strong>출발지:</strong> {startAddress}
          <br />
          <strong>도착지:</strong> {endAddress}
        </p>
        <div className="mt-3 text-sm text-mono_700">
          ⏱️ 소요 시간: {(totalTime / 60).toFixed(1)}분<br />
          🛣 이동 거리: {(totalDistance / 1000).toFixed(2)}km
          <br />
          🚶 도보 거리: {totalWalkDistance}m<br />
          🔁 환승 횟수: {transferCount}회
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-mono_300">
        <h4 className="font-semibold mb-2">경로 상세</h4>
        <ul className="space-y-3">
          {steps.map((step, i) => (
            <li key={i} className="text-sm text-mono_700">
              <div>
                <span className="font-medium">[{step.mode}]</span>{' '}
                {step.route ? `${step.route} ` : ''}({step.startName} →{' '}
                {step.endName})
              </div>
              <div className="text-mono_500">⏱ {step.sectionTime}초</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
