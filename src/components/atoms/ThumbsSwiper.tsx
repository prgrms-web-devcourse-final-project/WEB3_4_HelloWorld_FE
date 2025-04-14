'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { useState } from 'react';
import { Swiper as SwiperClass } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import { Image } from '@heroui/react';

type Props = {
  images: string[];
};

export default function SyncedGallerySwiper({ images }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className="w-full">
      <Swiper
        autoHeight
        navigation
        className="rounded-small w-full  overflow-hidden mb-4"
        modules={[FreeMode, Navigation, Thumbs]}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx} className="w-full  ">
            <div className="w-full flex max-h-96 justify-center items-center">
              <Image
                className="w-full  aspect-square object-cover"
                height={400}
                src={src}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        freeMode
        watchSlidesProgress
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
          1024: {
            slidesPerView: 7,
            spaceBetween: 5,
          },
        }}
        className="rounded-small overflow-hidden"
        modules={[FreeMode, Navigation, Thumbs]}
        slidesPerView={4}
        spaceBetween={5}
        onSwiper={(swiper) => setThumbsSwiper(swiper)}
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <Image
              className="w-full h-20 object-cover aspect-square cursor-pointer opacity-80 hover:opacity-100 transition"
              fallbackSrc={'https://via.placeholder.com/300x200'}
              loading="lazy"
              src={src}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
