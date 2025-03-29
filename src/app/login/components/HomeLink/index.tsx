'use client';

import Link from 'next/link';

const HomeLink = () => (
  <Link
    href="/"
    className="font-bold underline underline-offset-4 hover:opacity-80 transition text-mono_700"
  >
    Gym<span className="text-main">M</span>ate
  </Link>
);

export default HomeLink;
