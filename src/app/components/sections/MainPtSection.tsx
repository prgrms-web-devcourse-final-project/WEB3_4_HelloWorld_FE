'use client';
import { useEffect } from 'react';

import MainPtCard from '@/components/molecules/Main/MainPtCard';
import MainSection from '@/components/organisms/Main/MainSection';
import Animation from '@/utils/animations';

export default function MainPtSection() {
  useEffect(() => {
    Animation.ptSection.main();
  }, []);

  return (
    <MainSection
      description={'짐 메이트와 함께하는 사용자와 전문가'}
      subTitle={'인기 트레이너'}
      title={'나만의 PT트레이너'}
    >
      <MainPtCard
        backgroundImage={
          'https://www.job-post.co.kr/news/photo/202003/5094_3151_3911.jpg'
        }
        content={'sdfsdf'}
        title={'김호석 트레이너'}
      />
    </MainSection>
  );
}
