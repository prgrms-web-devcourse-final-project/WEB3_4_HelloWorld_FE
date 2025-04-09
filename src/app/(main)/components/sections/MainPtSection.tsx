'use client';
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import Animation from '@/utils/animations';
import MainPtCard from '@/components/molecules/Main/MainPtCard';
import MainSection from '@/components/organisms/Main/MainSection';

import 'swiper/css';
export default function MainPtSection() {
  useEffect(() => {
    const cleanup = Animation.ptSection.main();

    return () => {
      cleanup?.();
    };
  }, []);

  return (
    <MainSection
      description={'짐 메이트와 함께하는 사용자와 전문가'}
      subTitle={'인기 트레이너'}
      title={'나만의 PT트레이너'}
    >
      <Swiper
        className="overflow-visible"
        slidesPerView={4}
        spaceBetween={50}
        style={{ maxWidth: 'unset !important' }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <SwiperSlide key={item} virtualIndex={item}>
            <MainPtCard
              backgroundImage={''}
              content={
                'pt는 아무데서나 받으시면 안됩니다. 전문가와 상담하고 지금 바로 나의 바디를 체인지 해보세요 지금 바로 나의 바디를 체인지 해보세요 '
              }
              score={4.7}
              title={'김호석 트레이너'}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </MainSection>
  );
}
