import Section from '@/components/atoms/Section';
import Wave from '@/components/atoms/Wave';
import NumberCountCard from '@/components/molecules/NumberCountCard';
import MainSection from '@/components/organisms/Main/MainSection';

export default function MainGymMateSection() {
  return (
    <div>
      <Wave />
      <div className="bg-main py-20 ">
        <Section>
          <div className="flex">
            <MainSection
              description="짐 메이트와 함께하는 사용자와 전문가들이 늘고 있다~~ 정도"
              subTitle="WHIT GYM MATE"
              title={`GYM MATE &shy;
함께 하는 사람들`}
            >
              <NumberCountCard countNumber={120000} title={'누적 회원수'} />
            </MainSection>
            <div className="w-full">dddd</div>
          </div>
        </Section>
      </div>
    </div>
  );
}
