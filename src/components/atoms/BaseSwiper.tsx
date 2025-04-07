// components/common/BaseSwiper.tsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

type BaseSwiperProps = {
  items: React.ReactNode[];
  autoplay?: boolean;
  perView?: number;
  pagination?: boolean;
  navigation?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export default function BaseSwiper({
  items,
  autoplay = false,
  perView = 1,
  pagination = false,
  navigation = false,
  className = '',
  children,
}: BaseSwiperProps) {
  return (
    <Swiper
      autoplay={autoplay ? { delay: 3000, disableOnInteraction: false } : false}
      className={className}
      loop={autoplay}
      modules={[Autoplay, Navigation, Pagination]}
      navigation={navigation}
      pagination={pagination ? { clickable: true } : false}
      slidesPerView={perView}
      spaceBetween={16}
    >
      {items.map((item, index) => (
        <SwiperSlide key={index}>{item}</SwiperSlide>
      ))}
      {children}
    </Swiper>
  );
}
