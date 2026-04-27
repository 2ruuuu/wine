'use client';

import { Star } from '@/constants/icons';
import { NUMBER_ARR } from '@/constants/starRating';
import { InteractiveStarProps } from './type';
import Image from 'next/image';

const StarRating = ({ rating, onChange }: InteractiveStarProps) => {
  return (
    <div className="flex gap-1">
      {NUMBER_ARR.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange?.(item)}
          className={`transition-transform active:scale-90 ${
            onChange ? 'cursor-pointer hover:scale-110' : 'cursor-default'
          }`}
          aria-label={`별점 ${item}점 선택`}
        >
          <Image
            src={Star}
            alt={`${item}점`}
            width={20}
            height={20}
            className={`transition-opacity ${
              item > rating ? 'opacity-20 grayscale' : 'opacity-100'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
