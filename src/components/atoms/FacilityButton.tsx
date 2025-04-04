import clsx from 'clsx';
import Image from 'next/image';

import { MyButton } from './Button';

interface FacilityButtonProps {
  selected: boolean;
  onClick: () => void;
  icon: string;
  label: string;
  disableHover?: boolean; // ✅ 요거 추가!
  disabled?: boolean; // ✅ 클릭도 막기 위한 추가
}

export const FacilityButton = ({
  selected,
  onClick,
  icon,
  label,
  disableHover = false,
  disabled = false,
}: FacilityButtonProps) => {
  return (
    <MyButton
      className={clsx(
        'border transition-all duration-200',
        selected
          ? 'bg-main text-mono_100'
          : disableHover
            ? 'text-mono_500' // ✅ hover 없이 색 고정
            : 'text-mono_500 hover:bg-main hover:text-mono_050',
        disabled && 'pointer-events-none', // ✅ 클릭도 막음
      )}
      color="facility"
      size="facility"
      onClick={onClick}
    >
      <Image
        alt={label}
        className="w-10 h-10 object-contain"
        height={40}
        src={icon}
        width={40}
      />

      <span className="text-[12px] leading-tight">{label}</span>
    </MyButton>
  );
};
