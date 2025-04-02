// components/atoms/FacilityButton.tsx
import clsx from 'clsx';

import { MyButton } from './Button';

interface FacilityButtonProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const FacilityButton = ({
  selected,
  onClick,
  children,
}: FacilityButtonProps) => {
  return (
    <MyButton
      className={clsx(
        'w-[80px] h-[80px] flex flex-col items-center justify-center space-y-1 border transition-all duration-200',
        selected
          ? 'border-main' // ✅ 클릭 시 테두리까지 바꿔줌
          : 'text-mono_500 hover:bg-main hover:text-main',
      )}
      variant="ghost"
      onClick={onClick}
    >
      {children}
    </MyButton>
  );
};
