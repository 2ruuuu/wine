import Image from 'next/image';

import { Star } from '@/constants/icons';
import { NUMBER_ARR } from '@/constants/starRating';

import { StarRatingProps } from './type';

const StarRating = ({ rating, className = 'w-5 h-5' }: StarRatingProps) => {
  return (
    <div className="flex items-center gap-0.5">
      {NUMBER_ARR.map((item) => (
        <Image
          key={item}
          src={Star}
          alt="별"
          width={27}
          height={27}
          className={`${className} ${item > rating ? 'invert' : ''}`}
        />
      ))}
    </div>
  );
};

export default StarRating;
