'use client';

import { Progress } from '@heroui/react';
import React from 'react';

interface ProgressBarProps {
  percent: number;
  showValueLabel?: boolean;
  color?: string;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  percent,
  showValueLabel = false,
  color = 'primary',
  className = '',
}) => (
  <div className="relative flex flex-col items-center w-full gap-2">
    <Progress
      aria-label="Progress"
      value={percent}
      className={className}
      style={{ backgroundColor: 'mono_700' }}
      color="primary"
    />
    {showValueLabel && (
      <span
        className={`text-sm font-medium text-mono_700 ${
          percent === 100
            ? 'absolute right-[390px] top-[12px]'
            : 'self-center text-center'
        }`}
      >
        {percent}%
      </span>
    )}
  </div>
);

export default ProgressBar;
