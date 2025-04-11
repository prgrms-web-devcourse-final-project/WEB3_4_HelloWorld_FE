'use client';

import { Button as HeroButton } from '@heroui/react';
import { FC } from 'react';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  size?: 'small' | 'medium' | 'large'; // 텍스트 크기 정도만 컨트롤
  width?: string; // 사용자 지정 너비 (예: '500px')
  height?: string; // 사용자 지정 높이 (예: '60px')
  children: React.ReactNode;
  className?: string; // 추가 스타일링을 위한 className
  onClick?: () => void;
}

const CustomButton: FC<ButtonProps> = ({
  type,
  size = 'medium', // 기본 크기 medium
  width = '452px', // 기본 너비
  height = '48px', // 기본 높이
  children,
  className = '',
  onClick,
}) => {
  // size prop에 따라 텍스트 크기만 지정 (버튼 높이는 inline style로 제어)
  let textSizeClass = '';

  if (size === 'small') {
    textSizeClass = 'text-sm';
  } else if (size === 'large') {
    textSizeClass = 'text-lg';
  } else {
    textSizeClass = 'text-base';
  }

  return (
    <HeroButton
      className={`${textSizeClass} bg-main text-main-foreground hover:opacity-90 rounded-xl dark:bg-primary dark:text-primary-foreground ${className}`}
      style={{ width, height }} // 여기서 사용자 지정 width와 height 적용
      type={type}
      onClick={onClick}
    >
      {children}
    </HeroButton>
  );
};

export default CustomButton;
