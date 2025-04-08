'use client';

import { useEffect } from 'react';

import MainLayoutTemplate from '@/components/templates/MainLayoutTemplate';
import { useInitUser } from '@/hooks/useInitUser';
import { useMemberStore } from '@/stores/testAuthStore';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useMemberStore((state) => state.user);

  useInitUser();
  useEffect(() => {
    console.log(user, 'user');
  }, [user]);

  return (
    <div>
      <MainLayoutTemplate>{children}</MainLayoutTemplate>
    </div>
  );
}
