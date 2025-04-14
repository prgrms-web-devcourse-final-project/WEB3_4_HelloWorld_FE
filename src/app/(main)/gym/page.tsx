import dynamic from 'next/dynamic';

const GymPage = dynamic(() => import('@/components/templates/GymPage'), {
  ssr: false,
});

export default function GymPages() {
  return <GymPage />;
}
