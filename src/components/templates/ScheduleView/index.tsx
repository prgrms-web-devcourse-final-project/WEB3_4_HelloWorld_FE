'use client';

import Calendar from '@/components/molecules/Calendar';
import CalenderView from '@/components/templates/ScheduleView/CalenderView';
import CalendarSummaryCards from '@/app/myfitness/components/CalendarCards/CalenderCards';
import ThreeLiftChartsTemplate from '@/components/molecules/Chart';

const ScheduleView = () => {
  //임시 데이터
  const summaryData = [
    { title: 'GymMate', value: '2500KG' },
    {
      title: '벤치 프레스 평균',
      value: '2500KG',
      icon: (
        <img
          src="/assets/icons/benchPress.svg"
          alt="벤치 프레스"
          width={32}
          height={32}
        />
      ),
    },
    {
      title: '데드리프트 평균',
      value: '2500KG',
      icon: (
        <img
          src="/assets/icons/deadlift.svg"
          alt="데드리프트"
          width={32}
          height={32}
        />
      ),
    },
    {
      title: '스쿼트 평균',
      value: '2500KG',
      icon: (
        <img
          src="/assets/icons/squat.svg"
          alt="스쿼트"
          width={32}
          height={32}
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
        <Calendar />
        <CalenderView />
      </div>

      <CalendarSummaryCards data={summaryData} />

      <ThreeLiftChartsTemplate />
    </div>
  );
};

export default ScheduleView;
