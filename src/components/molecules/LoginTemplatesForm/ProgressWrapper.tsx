'use client';

import ProgressBar from '@/app/(main)/login/components/ProgressBar';

interface ProgressWrapperProps {
  progress: number;
  children: React.ReactNode;
}

const ProgressWrapper = ({ progress, children }: ProgressWrapperProps) => (
  <>
    <ProgressBar
      showValueLabel
      className="w-[452px] h-2 rounded-full"
      percent={progress}
    />
    {children}
  </>
);

export default ProgressWrapper;
