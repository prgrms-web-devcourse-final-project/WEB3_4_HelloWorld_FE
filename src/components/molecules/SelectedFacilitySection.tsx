// components/molecules/SelectedFacilitySection.tsx
import { FacilityButton } from '@/components/atoms/FacilityButton';

interface SelectedFacilitySectionProps {
  facilities: string[];
  iconMap: Record<string, string>;
  selected?: boolean; // ✅ 기본값 false로
  className?: string;
}

export default function SelectedFacilitySection({
  facilities,
  iconMap,
  selected = false,
  className,
}: SelectedFacilitySectionProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <h4 className="text-[16px] font-semibold font-pretendard text-mono_800">
        편의시설
      </h4>
      <div className="flex flex-wrap gap-2">
        {facilities.map((facility) => (
          <FacilityButton
            key={facility}
            disableHover={true} // ✅ hover 제거
            disabled={true} // ✅ 클릭 제거
            icon={iconMap[facility]}
            label={facility}
            selected={selected}
            onClick={() => {}}
          />
        ))}
      </div>
    </div>
  );
}
