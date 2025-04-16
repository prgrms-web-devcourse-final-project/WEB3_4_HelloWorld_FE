'use client';
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useQuery } from '@tanstack/react-query';

import MainSection from '@/components/organisms/Main/MainSection';
import Animation from '@/utils/animations';

import 'swiper/css';

import { PtProduct } from '@/types/pt.types';
import fetcher from '@/utils/apiInstance';
import MainPtCard from '@/components/molecules/Main/MainPtCard';

type PtResponse = {
  content: PtProduct[];
};

export default function MainPtSection() {
  const { data } = useQuery({
    queryKey: ['ptProductList'],
    queryFn: async () => {
      const response = await fetcher<PtResponse>(`/ptProduct`, {
        method: 'GET',
        token: false,
      });

      return response;
    },
  });

  useEffect(() => {
    if (!data?.content) return;
    const cleanup = Animation.ptSection.main();

    return () => {
      cleanup?.();
    };
  }, [data]);

  return (
    <MainSection
      isRouteButton
      buttonText="우리동네 PT프로그램 찾기"
      description="지역별 트레이너들이 제공하는 다양한 PT 상품을 비교하고,
나에게 딱 맞는 운동 계획을 시작해보세요."
      link="/pt"
      subTitle="PT 프로그램"
      title="우리동네 PT상품"
    >
      <Swiper
        className="overflow-visible"
        slidesPerView={4}
        spaceBetween={50}
        style={{ maxWidth: 'unset !important' }}
      >
        {data?.content.map((item, index) => (
          <SwiperSlide key={index} className="py-10" virtualIndex={index}>
            <MainPtCard
              key={index}
              backgroundImage={item.trainer.profile || ''}
              content={item.info || ''}
              id={item.trainer.trainerId.toString()}
              productName={item.productName}
              ptProductFee={item.ptProductFee}
              score={item.trainer.score || 0}
              title={item.trainer.trainerName}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </MainSection>
  );
}
