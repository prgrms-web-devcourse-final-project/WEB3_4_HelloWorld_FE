import { MapPinIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { Image } from '@heroui/react';

import { Gym } from '@/types/pt.types';

export default function GymListCardItem({ gym }: { gym: Gym }) {
  return (
    <div className="flex items-center justify-between w-full h-full p-3 bg-white rounded-xl border border-mono_100 hover:bg-mono_100 transition cursor-pointer shadow-sm">
      <div className="flex flex-col justify-center gap-1 w-[65%] h-full">
        <h3 className="text-[20px] font-medium font-pretendard text-mono_700">
          {gym?.gymName}
        </h3>
        <div className="flex items-center text-[14px] text-mono_400 font-pretendard">
          <MapPinIcon className="w-3 h-3 mr-1" /> {gym?.gymAddress}
        </div>
        <div className="flex items-center text-[14px] gap-2 font-pretendard">
          <span className="text-[#5BA744] font-medium">● 운영중</span> |
          <span className="text-mono_400 font-normal">
            {gym?.gymOpen} ~ {gym?.gymClose}
          </span>
        </div>
        <div className="flex items-center text-[14px] text-mono_400 font-normal font-pretendard">
          <StarIcon className="w-3 h-3 mr-1 text-yellow-400" /> {gym?.gymScore}
        </div>
      </div>

      <Image
        alt="gym"
        className="rounded-lg object-cover"
        height={100}
        src={gym?.images[0]}
        width={160}
      />
    </div>
  );
}
