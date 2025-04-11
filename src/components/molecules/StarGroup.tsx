import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

import { useStarRating } from '@/hooks/useStarRating';
import { calculateRate } from '@/utils/formatter';

interface IStarProps {
  w: string;
  h: string;
  readonly: boolean;
  rate?: number;
  onChange?: (rating: number) => void;
}

export default function Star({
  w,
  h,
  readonly,
  rate = 0,
  onChange,
}: IStarProps) {
  const {
    rating,
    hoverRating,
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
  } = useStarRating({ initialRate: rate, readonly, onChange });

  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, index) => {
        const isFilled =
          hoverRating !== null ? hoverRating >= index + 1 : rating >= index + 1;

        return (
          <button
            key={index}
            className={`relative ${w} ${h} cursor-pointer overflow-hidden`}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <StarIconSolid
              className={`${w} ${h} ${isFilled ? 'text-main' : 'text-gray200'}`}
            />
            {readonly && (
              <span
                className={`${h} absolute left-0 top-0 overflow-hidden`}
                style={{ width: calculateRate(rating, index + 1) }}
              >
                <StarIconSolid className={`${w} ${h} text-main`} />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
