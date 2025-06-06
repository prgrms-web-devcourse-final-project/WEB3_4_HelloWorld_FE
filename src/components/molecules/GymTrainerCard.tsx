// components/molecules/GymTrainerCard.tsx
import { Image } from '@heroui/react';

interface GymTrainerCardProps {
  name: string;
  description: string;
  price: string;
  specialty?: string;
  career?: string;
  awards?: {
    awardYear: string;
    awardName: string;
    awardInfo: string;
  }[];

  image: string;
}

export default function GymTrainerCard({
  name,
  description,
  price,
  specialty,
  career,
  awards = [],
  image,
}: GymTrainerCardProps) {
  return (
    <button className="w-full flex justify-between items-start p-4 rounded-xl border border-mono_100 shadow-sm bg-mono_100 text-left gap-4">
      {/* 텍스트 영역 */}
      <div className="flex-1 flex flex-col gap-1">
        <p className="text-[14px] text-mono_600 font-pretendard">
          “{description}”
        </p>
        <h5 className="text-[20px] font-medium font-pretendard text-mono_900">
          {name} 트레이너
        </h5>

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
            • <span className="text-mono_600">수상이력 :</span>{' '}
            {awards.length > 0 ? (
              <ul className="list-disc list-inside pl-2">
                {awards.map((award, idx) => (
                  <li key={idx}>
                    {award.awardYear} - {award.awardName} ({award.awardInfo})
                  </li>
                ))}
              </ul>
            ) : (
              '-'
            )}
          </p>
        </div>
      </div>

      {/* 이미지 */}
      <div className="w-[96px] h-[160px] rounded-lg overflow-hidden flex-shrink-0">
        <Image
          alt={name}
          className="w-ful aspect-video h-full object-cover"
          height={160}
          src={image}
          width={96}
        />
      </div>
    </button>
  );
}
