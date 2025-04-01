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
              backgroundImage={
                'https://scontent-gmp1-1.xx.fbcdn.net/v/t39.30808-6/468976867_18145541191355519_2759252367887413235_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=oyiPV27iNh0Q7kNvgGRiRS6&_nc_oc=AdmI-aGb8SZyi7c2SuWXzLsKm3q8572F1bkeOz5MtYYXzv-jC89oM4ekomj2IbfHYro&_nc_zt=23&_nc_ht=scontent-gmp1-1.xx&_nc_gid=wzSQs-g3aNJMDjn7ovS79w&oh=00_AYHXc7cSMXilV8ZiEktdpna6vQs_dC1dYhVyakOxtcIG8g&oe=67F042CD'
              }
              content={
                'pt는 아무데서나 받으시면 안됩니다. 전문가와 상담하고 지금 바로 나의 바디를 체인지 해보세요 지금 바로 나의 바디를 체인지 해보세요 '
              }
              title={'김호석 트레이너'}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </MainSection>
  );
}
