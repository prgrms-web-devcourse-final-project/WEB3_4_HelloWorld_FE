// components/atoms/FacilityButton.tsx
import clsx from 'clsx';

import { MyButton } from './Button';

interface FacilityButtonProps {
  selected: boolean;
  onClick: () => void;
  icon: string;
  label: string;
}

export const FacilityButton = ({
  selected,
  onClick,
  icon,
  label,
}: FacilityButtonProps) => {
  return (
    <MyButton
      className={clsx(
        ' border transition-all duration-200',
        selected
          ? 'bg-main text-mono_100'
          : 'text-mono_500 hover:bg-main hover:text-mono_050',
      )}
      color="facility"
      size="facility"
      onClick={onClick}
    >
      <img alt={label} className="w-10 h-10" src={icon} />
      <span className="text-[12px] leading-tight">{label}</span>
    </MyButton>
  );
};
