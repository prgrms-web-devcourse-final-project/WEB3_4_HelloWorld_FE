'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/stores/memberTypeStore';
import PointHeader from '@/components/templates/PointTemplate/PointHeader';
import PointPlanSection from '@/components/templates/PointTemplate/PointPlanSection';
import useToast from '@/hooks/useToast';
export default function PointTemplate() {
  const router = useRouter();
  const { isLoggedIn, isOwner } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    useAuthStore.getState().initializeAuth();
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    useAuthStore.getState().initializeAuth();
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    if (!isLoggedIn) {
      router.push('/login');

      return;
    }

    if (isOwner !== null) {
      showToast({
        title: '일반 회원만 이용할 수 있습니다.',
        description: '일반 회원만 이용할 수 있습니다.',
        lazy: true,
      });
      router.push('/');
    }
  }, [isHydrated, isLoggedIn, isOwner]);

  if (!isHydrated) return null;

  return (
    <>
      <section className="w-full max-w-[1440px] px-8 mx-auto pt-[100px] mb-[100px]">
        <PointHeader />
      </section>

      <PointPlanSection />
    </>
  );
}
