import { STAR } from '@/constants/icons';
import { StarRatingProps } from './type';
import Image from 'next/image';

const NUMBER_ARR = [1, 2, 3, 4, 5] as const;

const StarRating = ({ rating }: StarRatingProps) => {
  return (
    <div className="flex gap-0.5">
      {NUMBER_ARR.map((item) => (
        <Image
          key={item}
          src={STAR}
          alt="별"
          width={20}
          height={20}
          className={item > rating ? 'invert' : ''}
        />
      ))}
    </div>
  );
};

export default StarRating;
