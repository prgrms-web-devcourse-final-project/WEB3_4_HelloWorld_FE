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
  className = '',
}) => (
  <div className="relative flex flex-col items-center w-full gap-2">
    <Progress
      aria-label="Progress"
      className={className}
      color="primary"
      style={{ backgroundColor: 'mono_700' }}
      value={percent}
    />
    {showValueLabel && (
      <span
        className={`text-sm font-medium text-mono_700 ${
          percent === 100
            ? 'absolute right-[725px] top-[12px]'
            : 'self-center text-center'
        }`}
      >
        {percent}%
      </span>
    )}
  </div>
);

export default ProgressBar;
