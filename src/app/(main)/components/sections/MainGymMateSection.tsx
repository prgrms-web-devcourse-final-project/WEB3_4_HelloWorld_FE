'use client';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import Section from '@/components/atoms/Section';
import Wave from '@/components/molecules/Wave';
import NumberCountCard from '@/components/molecules/NumberCountCard';
import MainSection from '@/components/organisms/Main/MainSection';
import Animation from '@/utils/animations';

const BarChart = dynamic(
  () => import('@/components/molecules/Chart/BarChartTemplate'),
  {
    ssr: false,
  },
);

export default function MainGymMateSection() {
  useEffect(() => {
    Animation.gymmateSection.main();
  }, []);

  return (
    <div>
      <Wave />
      <div className="bg-main py-48 ">
        <Section>
          <div className="flex justify-between gap-10">
            <MainSection
              isFixedColor
              description="운동을 함께하는 사용자와 트레이너들의 이야기,
지금 짐 메이트에서 확인해보세요."
              link="/gym"
              subTitle="WHIT GYM MATE"
              title={`GYM MATE 함께 하는 사람들`}
            >
              <div className="flex max-w-xl flex-col gap-4">
                <NumberCountCard countNumber={0} title={'누적 회원수'} />
                <div className="flex w-full gap-4">
                  <NumberCountCard
                    fullWidth
                    countNumber={0}
                    title={'누적 PT 매칭수'}
                  />
                  <NumberCountCard
                    fullWidth
                    countNumber={0}
                    title={'제휴 헬스장 누적 등록 수 '}
                  />
                </div>
              </div>
            </MainSection>
            <div className="w-full">
              <BarChart
                categories={['2024.03', '2024.04', '2024.05', '2024.06']}
                series={[
                  {
                    name: 'GymMate 회원 평균',
                    data: [95, 115, 108, 318],
                  },
                ]}
                styleOptions={{
                  labelColor: '#fff',
                  colors: ['#fff'],
                }}
              />
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
