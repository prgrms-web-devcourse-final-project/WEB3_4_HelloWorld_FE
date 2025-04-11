'use client';

import type { BigThreeStatus } from '@/types/bigthree';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import InputField from '@/app/(main)/login/components/InputField';
import CustomButton from '@/app/(main)/login/components/CustomButton';
import dayjs from '@/utils/dayjsSetup';
import useToast from '@/hooks/useToast';
import { fetchBigThreeStatusApi, postBigThreeApi } from '@/apis/bigthreeApi';

const PieChart = dynamic(
  () => import('@/components/molecules/Chart/PieChartTemplate'),
  { ssr: false },
);
const BarChart = dynamic(
  () => import('@/components/molecules/Chart/BarChartTemplate'),
  { ssr: false },
);
const LineChart = dynamic(
  () => import('@/components/molecules/Chart/LineChartTemplate'),
  { ssr: false },
);

const ThreeLiftChartsTemplate = () => {
  const [data, setData] = useState<BigThreeStatus | null>(null);
  const [bench, setBench] = useState(0);
  const [deadlift, setDeadlift] = useState(0);
  const [squat, setSquat] = useState(0);
  const { showToast } = useToast();

  const fetchStats = async () => {
    try {
      const res = await fetchBigThreeStatusApi();

      setData(res);
    } catch {}
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSubmit = async () => {
    const today = dayjs().format('YYYY-MM-DD');

    try {
      await postBigThreeApi({
        date: today,
        bigthreeRequest: { bench, deadlift, squat },
      });

      showToast({
        title: '등록 완료',
        description: '3대 기록이 성공적으로 저장되었습니다.',
        lazy: true,
      });

      await fetchStats();
    } catch {
      showToast({
        title: '등록 실패',
        description: '하루에 한번씩 갱신 가능합니다.',
        type: 'danger',
        lazy: true,
      });
    }
  };

  const pieSeries = data
    ? [data.benchRate, data.deadliftRate, data.squatRate]
    : [33, 33, 34];

  const userBench = data?.recentBench ?? 0;
  const userDeadlift = data?.recentDeadlift ?? 0;
  const userSquat = data?.recentSquat ?? 0;
  const userSum = userBench + userDeadlift + userSquat;

  const avgBench = data?.benchAverage ?? 0;
  const avgDeadlift = data?.deadliftAverage ?? 0;
  const avgSquat = data?.squatAverage ?? 0;
  const avgSum = avgBench + avgDeadlift + avgSquat;

  const barSeries = [
    {
      name: '사용자',
      data: [userBench, userDeadlift, userSquat, userSum],
    },
    {
      name: 'GymMate 회원 평균',
      data: [avgBench, avgDeadlift, avgSquat, avgSum],
    },
  ];

  return (
    <div className="mt-[190px] flex flex-col gap-[50px]">
      <h2 className="text-3xl font-point mb-8">나의 3대 운동 통계</h2>
      <div className="flex gap-[50px]">
        <div className="w-[500px] h-[500px]">
          <PieChart
            labels={['벤치 프레스', '데드리프트', '스쿼트']}
            series={pieSeries}
          />
        </div>
        <div className="w-[884px] h-[586px]">
          <BarChart
            categories={['벤치 프레스', '데드리프트', '스쿼트', '합산']}
            series={barSeries}
          />
        </div>
      </div>
      <div className="flex justify-between mt-[50px]">
        <div className="w-[800px] h-[500px]">
          <LineChart
            categories={[
              '3월 1일',
              '3월 5일',
              '3월 10일',
              '3월 15일',
              '3월 20일',
              '3월 25일',
              '3월 30일',
            ]}
            data={[300, 310, 290, 320, 310, 300, 330]}
          />
        </div>
        <div className="flex flex-col mb-[100px]">
          <h3 className="text-3xl font-point mb-[40px]">3대기록 갱신하기</h3>
          <div className="w-[500px] h-[450px] bg-mono_050 shadow-md rounded-xl flex flex-col items-center justify-center gap-[50px]">
            <InputField
              height="50px"
              label="벤치 프레스"
              name="benchPress"
              placeholder="100kg"
              type="number"
              value={String(bench)}
              width="300px"
              onChange={(e) => setBench(Number(e.target.value))}
            />
            <InputField
              height="50px"
              label="데드리프트"
              name="deadlift"
              placeholder="100kg"
              type="number"
              value={String(deadlift)}
              width="300px"
              onChange={(e) => setDeadlift(Number(e.target.value))}
            />
            <InputField
              height="50px"
              label="스쿼트"
              name="squat"
              placeholder="100kg"
              type="number"
              value={String(squat)}
              width="300px"
              onChange={(e) => setSquat(Number(e.target.value))}
            />

            <CustomButton
              height="50px"
              size="medium"
              type="button"
              width="300px"
              onClick={handleSubmit}
            >
              기록 갱신하기
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeLiftChartsTemplate;
