'use client';

import type { BigThreeStatus } from '@/types/bigthree';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import CalendarWithModal from '@/components/templates/ScheduleView/CalendarWithModal';
import CalenderView from '@/components/templates/ScheduleView/CalenderView';
import SummaryCard from '@/app/(main)/myfitness/components/CalenderCards';
import ThreeLiftChartsTemplate from '@/components/molecules/Chart';
import { useAuthStore } from '@/stores/memberTypeStore';
import { fetchBigThreeStatusApi } from '@/apis/bigthreeApi';
import { formatKg } from '@/utils/bigThree';
import useToast from '@/hooks/useToast';

const ScheduleView = () => {
  const router = useRouter();
  const { isLoggedIn, isOwner } = useAuthStore();
  const { showToast } = useToast();
  const [isHydrated, setIsHydrated] = useState(false);
  const [bigThree, setBigThree] = useState<BigThreeStatus | null>(null);

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

    if (isOwner === true || isOwner === false) {
      showToast({
        title: '일반 회원만 이용할 수 있습니다.',
        description: '일반 회원만 이용할 수 있습니다.',
        lazy: true,
      });
      router.push('/');
    }
  }, [isHydrated, isLoggedIn, isOwner]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchBigThreeStatusApi();

        setBigThree(res);
      } catch {}
    };

    fetchData();
  }, []);

  if (!isHydrated) return null;

  const summaryData = bigThree
    ? [
        { title: 'GymMate', value: formatKg(bigThree.sumAverage) },
        {
          title: '벤치 프레스 평균',
          value: formatKg(bigThree.benchAverage),
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
          value: formatKg(bigThree.deadliftAverage),
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
          value: formatKg(bigThree.squatAverage),
          icon: (
            <Image
              alt="스쿼트"
              height={32}
              src="/assets/icons/squat.svg"
              width={32}
            />
          ),
        },
      ]
    : [];

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
