'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import CalenderView from '@/components/templates/ScheduleView/CalenderView';
import SummaryCard from '@/app/(main)/myfitness/components/CalenderCards';
import ThreeLiftChartsTemplate from '@/components/molecules/Chart';
import CalendarWithModal from '@/components/templates/ScheduleView/CalendarWithModal';
import { useAuthStore } from '@/stores/memberTypeStore';

const ScheduleView = () => {
  const router = useRouter();
  const { isLoggedIn, isOwner } = useAuthStore();

  const [isHydrated, setIsHydrated] = useState(false);

  //  상태 복구
  useEffect(() => {
    useAuthStore.getState().initializeAuth();
    setIsHydrated(true);
  }, []);

  //  접근 제어는 복구 완료 이후에만
  useEffect(() => {
    if (!isHydrated) return; //  초기 상태일 땐 아무것도 하지 않음

    if (!isLoggedIn) {
      router.push('/login');

      return;
    }

    if (isOwner !== null) {
      alert('일반 회원만 이용할 수 있습니다.');
      router.push('/');
    }
  }, [isLoggedIn, isOwner, isHydrated]);

  if (!isHydrated) return null;

  //임시 데이터
  const summaryData = [
    { title: 'GymMate', value: '2500KG' },
    {
      title: '벤치 프레스 평균',
      value: '2500KG',
      icon: (
        <Image
          alt="벤치 프레스"
          height={32}
          src="/assets/icons/benchPress.svg"
          width={32}
        />
      ),
    },
    {
      title: '데드리프트 평균',
      value: '2500KG',
      icon: (
        <Image
          alt="데드리프트"
          height={32}
          src="/assets/icons/deadlift.svg"
          width={32}
        />
      ),
    },
    {
      title: '스쿼트 평균',
      value: '2500KG',
      icon: (
        <Image
          alt="스쿼트"
          height={32}
          src="/assets/icons/squat.svg"
          width={32}
        />
      ),
    },
  ];

  return (
    <div className="p-6">
      <h2 className="font-point text-3xl ml-[20px] mb-[50px]">
        오운했 일정보기
      </h2>
      <div className="flex gap-8">
        <CalendarWithModal />
        <CalenderView />
      </div>

      <SummaryCard data={summaryData} />

      <ThreeLiftChartsTemplate />
    </div>
  );
};

export default ScheduleView;
