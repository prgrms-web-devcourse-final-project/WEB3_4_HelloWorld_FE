import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { useState } from 'react';

import { calculateRate } from '@/utils/formatter';

interface IStarProps {
  w: string;
  h: string;
  readonly: boolean;
  rate?: number;
}
export default function Star({ w, h, readonly, rate }: IStarProps) {
  const [rating, setRating] = useState(rate || 0);
  const handleClickStar = (index: number) => {
    if (!readonly) {
      setRating(index + 1);
    }
  };

  return (
    <div className={`flex`}>
      {' '}
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className={`relative ${w} ${h} cursor-pointer overflow-hidden`}
        >
          {' '}
          <StarIconSolid
            className={`${w} ${h} ${!readonly && rating >= index + 1 ? 'text-main' : 'text-gray200'}`}
            onClick={() => handleClickStar(index)}
          />{' '}
          {readonly && (
            <span
              className={`${h} absolute left-0 top-0 overflow-hidden`}
              style={rate ? { width: calculateRate(rating, index + 1) } : {}}
            >
              <StarIconSolid className={`${w} ${h} text-main`} />{' '}
            </span>
          )}
        </div>
      ))}{' '}
    </div>
  );
}
