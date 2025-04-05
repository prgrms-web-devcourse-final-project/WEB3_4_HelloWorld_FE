'use client';

import Link from 'next/link';
import React from 'react';

const ReturnHomeMessage: React.FC = () => {
  return (
    <div className=" text-center mb-[50px]">
      <span className="text-sm text-mono_400">
        Wherever you want, <span className="text-main">M</span>ate{' '}
      </span>
      <Link className="text-sm text-blue-500 underline" href="/">
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default ReturnHomeMessage;
