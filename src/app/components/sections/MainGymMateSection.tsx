'use client';
import Section from '@/components/atoms/Section';
import Wave from '@/components/molecules/Wave';
import NumberCountCard from '@/components/molecules/NumberCountCard';
import MainSection from '@/components/organisms/Main/MainSection';
import BarChart from '@/components/molecules/Chart/BarChartTemplate';

export default function MainGymMateSection() {
  return (
    <div>
      <Wave />
      <div className="bg-main py-48 ">
        <Section>
          <div className="flex justify-between gap-10">
            <MainSection
              isFixedColor
              description="짐 메이트와 함께하는 사용자와 전문가들이 늘고 있다~~ 정도"
              subTitle="WHIT GYM MATE"
              title={`GYM MATE 함께 하는 사람들`}
            >
              <div className="flex flex-col gap-4">
                <NumberCountCard countNumber={120000} title={'누적 회원수'} />
                <div className="flex w-full gap-4">
                  <NumberCountCard
                    fullWidth
                    countNumber={120000}
                    title={'누적 회원수'}
                  />
                  <NumberCountCard
                    fullWidth
                    countNumber={120000}
                    title={'누적 회원수'}
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
