// components/molecules/GymTrainerCard.tsx
import Image from 'next/image';

interface GymTrainerCardProps {
  name: string;
  description: string;
  price: string;
  specialty?: string;
  career?: string;
  awards?: string;
  image: string;
}

export default function GymTrainerCard({
  name,
  description,
  price,
  specialty,
  career,
  awards,
  image,
}: GymTrainerCardProps) {
  return (
    <button className="w-full flex justify-between items-start p-4 rounded-xl border border-mono_100 shadow-sm bg-white text-left gap-4">
      {/* 텍스트 영역 */}
      <div className="flex-1 flex flex-col gap-1">
        <h5 className="text-[20px] font-medium font-pretendard text-mono_900">
          {name} 트레이너
        </h5>
        <p className="text-[14px] text-mono_600 font-pretendard">
          “{description}”
        </p>
        <p className="text-[14px] font-semibold text-mono_700 font-pretendard">
          1회 PT {price} p ~
        </p>
        <div className="mt-1 space-y-[2px] text-[14px] text-mono_500 font-pretendard">
          <p>
            • <span className="text-mono_600">전문분야 :</span>{' '}
            {specialty || '-'}
          </p>
          <p>
            • <span className="text-mono_600">경력 :</span> {career || '-'}
          </p>
          <p>
            • <span className="text-mono_600">수상이력 :</span> {awards || '-'}
          </p>
        </div>
      </div>

      {/* 이미지 */}
      <div className="w-[96px] h-[160px] rounded-lg overflow-hidden flex-shrink-0">
        <Image
          alt={name}
          className="w-full h-full object-cover"
          height={160}
          src={image}
          width={96}
        />
      </div>
    </button>
  );
}
