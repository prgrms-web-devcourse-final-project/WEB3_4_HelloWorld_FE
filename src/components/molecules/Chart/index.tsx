'use client';
import dynamic from 'next/dynamic';

import InputField from '@/app/(main)/login/components/InputField';
import CustomButton from '@/app/(main)/login/components/CustomButton';
// 서버 사이드 렌더링 방지 안 하면 에러가 뜸..
const PieChart = dynamic(() => import('./PieChartTemplate'), { ssr: false });
const BarChart = dynamic(() => import('./BarChartTemplate'), { ssr: false });
const LineChart = dynamic(() => import('./LineChartTemplate'), { ssr: false });

const ThreeLiftChartsTemplate = () => (
  <div className="mt-[190px] flex flex-col gap-[50px]">
    <h2 className="text-3xl font-point mb-8">나의 3대 운동 통계</h2>
    <div className="flex gap-[50px]">
      <div className="w-[500px] h-[500px]">
        <PieChart
          labels={['벤치 프레스', '데드리프트', '스쿼트']}
          series={[25, 37, 38]}
        />
      </div>
      <div className="w-[884px] h-[586px]">
        <BarChart
          categories={['벤치 프레스', '데드리프트', '스쿼트', '합산']}
          series={[
            {
              name: '사용자',
              data: [100, 120, 110, 330],
            },
            {
              name: 'GymMate 회원 평균',
              data: [95, 115, 108, 318],
            },
          ]}
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
            width="300px"
          />
          <InputField
            height="50px"
            label="데드리프트"
            name="deadlift"
            placeholder="100kg"
            type="number"
            width="300px"
          />
          <InputField
            height="50px"
            label="스쿼트"
            name="squat"
            placeholder="100kg"
            type="number"
            width="300px"
          />
          <CustomButton height="50px" size="medium" type="button" width="300px">
            기록 갱신하기
          </CustomButton>
        </div>
      </div>
    </div>
  </div>
);

export default ThreeLiftChartsTemplate;
