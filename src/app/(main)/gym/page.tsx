import dynamic from 'next/dynamic';

const GymPageTemplate = dynamic(
  () => import('@/components/templates/GymPageTemplate'),
  { ssr: false },
);

export default function GymPage() {
  return <GymPageTemplate />;
}
