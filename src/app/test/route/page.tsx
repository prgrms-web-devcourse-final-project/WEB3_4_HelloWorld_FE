'use client';

import dynamic from 'next/dynamic';

const RoutePanelTest = dynamic(() => import('@/components/RoutePanelTest'), {
  ssr: false,
});

export default function Page() {
  return <RoutePanelTest />;
}
