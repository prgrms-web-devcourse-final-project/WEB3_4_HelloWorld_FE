'use client';

import ProgressBar from '@/app/login/components/ProgressBar';

interface ProgressWrapperProps {
  progress: number;
  children: React.ReactNode;
}

const ProgressWrapper = ({ progress, children }: ProgressWrapperProps) => (
  <>
    <ProgressBar
      percent={progress}
      showValueLabel
      className="w-[452px] h-2 rounded-full"
    />
    {children}
  </>
);

export default ProgressWrapper;
