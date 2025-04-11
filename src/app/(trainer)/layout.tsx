'use client';
import TrainerLayoutTemplate from '@/components/templates/TrainerLayoutTemplate';
import { useInitUser } from '@/hooks/useInitUser';

export const dynamic = 'force-dynamic';

export const runtime = 'edge';

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useInitUser();

  return <TrainerLayoutTemplate>{children}</TrainerLayoutTemplate>;
}
