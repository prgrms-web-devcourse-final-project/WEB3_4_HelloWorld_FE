'use client';

import { usePathname } from 'next/navigation';


import Footer from '@/components/organisms/Footer';
import Header from '@/components/organisms/Header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Footer 안보일 경로
  const hideFooter = pathname.startsWith('/mypage/gym/edit');

  return (
    <>
      <Header />
      <div>{children}</div>
      {!hideFooter && <Footer />}
      <Footer />
    </>
  );
}
