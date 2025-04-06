'use client';

import Link from 'next/link';

const RedirectHomeText = () => (
  <p className="mt-4 text-sm text-gray-500">
    Wherever you want, GymMate{' '}
    <Link className="text-[#3f74ec] underline underline-offset-2" href="/">
      홈으로 돌아가기
    </Link>
  </p>
);

export default RedirectHomeText;
