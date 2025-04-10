'use client';

import MainLayoutTemplate from '@/components/templates/MainLayoutTemplate';
import { useInitUser } from '@/hooks/useInitUser';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useInitUser();

  return (
    <div>
      <MainLayoutTemplate>{children}</MainLayoutTemplate>
    </div>
  );
}
