'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import { Card, CardHeader, CardBody } from '@heroui/card';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'; // ✅ 아이콘 import

interface Equipment {
  name: string;
  count: number;
  image: string;
}

interface EquipmentSectionProps {
  equipments: Equipment[];
}

export default function EquipmentSection({
  equipments,
}: EquipmentSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-[16px] font-semibold font-pretendard text-mono_800">
        운동기구
      </h4>

      <div className="relative w-full px-6">
        {/* 스와이퍼 */}
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          slidesPerView={3}
          spaceBetween={12}
        >
          {equipments.map((eq) => (
            <SwiperSlide key={eq.name}>
              <Card className="w-full rounded-xl shadow-sm border overflow-hidden">
                <CardHeader className="p-0 relative h-[80px] bg-mono_100">
                  <Image
                    fill
                    alt={eq.name}
                    className="object-cover"
                    src={
                      typeof eq.image === 'string'
                        ? eq.image
                        : eq.image
                          ? URL.createObjectURL(eq.image)
                          : '/default-image.png'
                    }
                  />
                </CardHeader>
                <CardBody className="p-3 text-center space-y-1">
                  <div className="text-sm font-semibold text-mono_800 truncate">
                    {eq.name}
                  </div>
                  <div className="text-xs text-mono_500">{eq.count}개 보유</div>
                </CardBody>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 이전 버튼 */}
        <button
          className="swiper-button-prev-custom absolute left-[-8px] top-1/2 -translate-y-1/2
          z-10 text-mono_500 hover:text-mono_900 transition"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>

        {/* 다음 버튼 */}
        <button
          className="swiper-button-next-custom absolute right-[-8px] top-1/2 -translate-y-1/2
          z-10 text-mono_500 hover:text-mono_900 transition"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
