import { useState } from 'react';

export function useStarRating({
  initialRate = 0,
  readonly = false,
  onChange,
}: {
  initialRate?: number;
  readonly?: boolean;
  onChange?: (rating: number) => void;
}) {
  const [rating, setRating] = useState(initialRate);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleClick = (index: number) => {
    if (!readonly) {
      const newRating = index + 1;

      setRating(newRating);
      onChange?.(newRating);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (!readonly) {
      setHoverRating(index + 1);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(null);
    }
  };

  return {
    rating,
    hoverRating,
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
  };
}
