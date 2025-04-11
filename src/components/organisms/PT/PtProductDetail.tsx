import { Card } from '@heroui/card';
import { Accordion, AccordionItem } from '@heroui/react';
import { TrophyIcon } from '@heroicons/react/24/solid';
import { PencilIcon } from '@heroicons/react/24/outline';

import MainPtCard from '@/components/molecules/Main/MainPtCard';
import { MyButton } from '@/components/atoms/Button';
import PtProductDetailItem from '@/components/molecules/PT/PtProductDetailItem';
import PtCardSection from '@/components/molecules/PT/PtCardSection';
import ScheduleTimeCheckGroup from '@/components/organisms/ScheduleTimeCheckGroup';
import GymListCardItem from '@/components/molecules/GYM/GymListCardItem';
import Star from '@/components/molecules/StarGroup';
import PtReviewItem from '@/components/molecules/PT/PtReviewItem';

export default function PtProductDetail() {
  const items = [
    {
      key: '1',
      title: 'PT 10회 풀 패키지',
      content: '트레이너 소개 내용',
      subtitle: '10회 풀 패키지',
      infomation: `안녕하세요! 10년 경력의 퍼스널 트레이너 김민수입니다.

저는 다음과 같은 전문 자격증을 보유하고 있습니다:
• NSCA-CPT (미국체력관리협회 공인 퍼스널 트레이너)
• 생활스포츠지도사 2급
• 기능해부학 전문가 과정 수료
• 스포츠 재활 트레이닝 전문가 과정 수료

주요 전문 분야:
• 체형 교정 및 자세 개선
• 다이어트 및 체지방 감량
• 근력 향상 프로그램
• 스포츠 재활 트레이닝

지금까지 500명 이상의 회원님들과 함께했으며, 특히 체형 교정과 다이어트 분야에서 
탁월한 성과를 이뤄내고 있습니다. 각 회원님의 신체 상태와 목표에 맞는 맞춤형 
프로그램을 제공하며, 식단 관리부터 생활 습관 개선까지 전반적인 건강 관리를 
도와드립니다.

첫 상담에서는 인바디 측정과 자세 분석을 통해 회원님의 현재 상태를 정확히 
파악하고, 이를 바탕으로 구체적인 트레이닝 계획을 수립해 드립니다.

운동은 즐겁고 지속 가능해야 한다고 믿습니다. 함께 건강한 변화를 만들어가요!`,
      images: [
        'https://cdn.jbnews.com/news/photo/202312/1417523_1233320_5953.jpg',
        'https://cdn.jbnews.com/news/photo/202312/1417523_1233320_5953.jpg',
        'https://cdn.jbnews.com/news/photo/202312/1417523_1233320_5953.jpg',
        'https://cdn.jbnews.com/news/photo/202312/1417523_1233320_5953.jpg',
        'https://cdn.jbnews.com/news/photo/202312/1417523_1233320_5953.jpg',
        'https://cdn.jbnews.com/news/photo/202312/1417523_1233320_5953.jpg',
        'https://cdn.jbnews.com/news/photo/202312/1417523_1233320_5953.jpg',
        'https://cdn.jbnews.com/news/photo/202312/1417523_1233320_5953.jpg',
        'https://cdn.jbnews.com/news/photo/202312/1417523_1233320_5953.jpg',
        'https://cdn.jbnews.com/news/photo/202312/1417523_1233320_5953.jpg',
        'https://cdn.jbnews.com/news/photo/202312/1417523_1233320_5953.jpg',
        'https://cdn.jbnews.com/news/photo/202312/1417523_1233320_5953.jpg',
      ],
    },
    {
      key: '2',
      title: 'PT 20회 풀 패키지',
      content: '트레이너 소개 내용',
      subtitle: '20회 풀 패키지',
      images: [
        'https://www.hsuco.or.kr/sports/File/Download/79b8474ed11e47c9c7bc3b6b3e7af76d',
        'https://www.hsuco.or.kr/sports/File/Download/79b8474ed11e47c9c7bc3b6b3e7af76d',
        'https://www.hsuco.or.kr/sports/File/Download/79b8474ed11e47c9c7bc3b6b3e7af76d',
      ],
    },
    {
      key: '3',
      title: 'PT 20회 풀 패키지',
      content: '트레이너 소개 내용',
      subtitle: '30회 풀 패키지',
      images: [
        'https://www.hsuco.or.kr/sports/File/Download/79b8474ed11e47c9c7bc3b6b3e7af76d',
        'https://www.hsuco.or.kr/sports/File/Download/79b8474ed11e47c9c7bc3b6b3e7af76d',
        'https://www.hsuco.or.kr/sports/File/Download/79b8474ed11e47c9c7bc3b6b3e7af76d',
      ],
    },
  ];

  return (
    <div className="flex   gap-8">
      <div className="w-full flex flex-col gap-8">
        <Accordion className="text-2xl" variant="splitted">
          {items.map((item) => (
            <AccordionItem
              key={item.key}
              aria-label={item.title}
              classNames={{
                title: 'text-2xl font-semibold text-mono_600',
                subtitle: 'text-mono_400 py-1',
                base: 'py-5 px-8',
              }}
              subtitle={item.subtitle}
              title={item.title}
            >
              <PtProductDetailItem item={item} />
            </AccordionItem>
          ))}
        </Accordion>
        <PtCardSection title="레슨 스케줄">
          <ScheduleTimeCheckGroup />
        </PtCardSection>
        <PtCardSection title="수상 내역">
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="w-full flex items-center px-3 gap-2 ">
                <TrophyIcon className="w-10 h-10 text-main" />
                <div>
                  <p className="text-mono_600">
                    2024 대한민국 피트니스 대상{' '}
                    <span className="text-mono_400">(2024.01.01)</span>
                  </p>
                  <p className="text-mono_400">
                    팔꿈치 트레이닝 부문 수상했습니다
                  </p>
                </div>
                <div />
              </div>
            ))}
          </div>
        </PtCardSection>
        <PtCardSection title="헬스장 정보">
          <GymListCardItem />
        </PtCardSection>
        <PtCardSection title="PT 수강 후기">
          <div className="flex py-8 justify-between">
            <div className="flex items-center h-full  gap-6">
              <p className="text-mono_700 text-5xl font-semibold">4.2</p>
              <div className="flex flex-col h-full justify-between">
                <Star readonly h={'h-5'} rate={4.2} w={'w-5'} />
                <p className="text-mono_400  text-sm">12개의 후기</p>
              </div>
            </div>
            <MyButton
              size="xl"
              startContent={<PencilIcon className="w-5 h-5 text-stone-100" />}
            >
              리뷰 작성하기
            </MyButton>
          </div>
        </PtCardSection>
        <PtCardSection>
          <PtReviewItem />
        </PtCardSection>
      </div>
      <div className="h-full max-w-[320px] sticky  hidden md:block top-20 w-full">
        <div className="  ">
          <Card className="p-2 flex flex-col gap-2 w-full">
            <MainPtCard
              backgroundImage={''}
              content={'dd'}
              score={4.7}
              title={'dd'}
            />
            <MyButton>예약하기</MyButton>
          </Card>
        </div>
      </div>
    </div>
  );
}
