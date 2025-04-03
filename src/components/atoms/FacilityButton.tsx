// components/atoms/FacilityButton.tsx
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
      className={`
        w-[80px] h-[80px] flex flex-col items-center justify-center space-y-[2px] rounded-xl
        transition-all duration-200
        ${
          selected
            ? 'bg-main text-mono_100'
            : 'bg-mono_200 text-mono_900 hover:bg-main hover:text-mono_100'
        }
      `}
      variant="facility"
      onClick={onClick}
    >
      <img alt={label} className="w-10 h-10" src={icon} />
      <span className="text-[12px] leading-tight">{label}</span>
    </MyButton>
  );
};
