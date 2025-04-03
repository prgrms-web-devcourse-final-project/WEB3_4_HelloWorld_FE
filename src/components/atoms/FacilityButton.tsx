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
        ' border transition-all duration-200',
        selected
          ? 'bg-main text-mono_100' // ✅ 클릭 시 테두리까지 바꿔줌
          : 'text-mono_500 hover:bg-main hover:text-mono_050',
      )}
      color="facility"
      size="facility"
      onClick={onClick}
    >
      {children}
    </MyButton>
  );
};
