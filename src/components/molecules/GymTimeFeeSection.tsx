interface GymTimeFeeSectionProps {
  timeInfo: string[];
  feeInfo: string[];
}

export default function GymTimeFeeSection({
  timeInfo,
  feeInfo,
}: GymTimeFeeSectionProps) {
  return (
    <div className="flex gap-2 w-full items-start">
      {/* 운영 시간 영역 */}
      <div className="flex flex-col w-1/2 gap-2">
        <h4 className="text-[16px] font-semibold font-pretendard text-mono_800">
          운영 시간
        </h4>
        <div className="p-3 bg-mono_100 rounded-xl border border-mono_100 shadow-sm text-[14px] text-mono_600 font-pretendard whitespace-pre-line">
          {timeInfo.join('\n')}
        </div>
      </div>

      {/* 이용 정보 영역 */}
      <div className="flex flex-col w-1/2 gap-2">
        <h4 className="text-[16px] font-semibold font-pretendard text-mono_800">
          이용 정보
        </h4>
        <div className="p-3 bg-mono_100 rounded-xl border border-mono_100 shadow-sm text-[14px] text-mono_600 font-pretendard whitespace-pre-line">
          {feeInfo.join('\n')}
        </div>
      </div>
    </div>
  );
}
