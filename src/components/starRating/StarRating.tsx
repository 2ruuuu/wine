import { Star } from '@/constants/icons';
import { StarRatingProps } from './type';
import { NUMBER_ARR } from '@/constants/starRating';
import Image from 'next/image';

const StarRating = ({ rating }: StarRatingProps) => {
  return (
    <div className="flex items-center gap-0.5">
      {NUMBER_ARR.map((item) => (
        <Image
          key={item}
          src={Star}
          alt="별"
          width={20}
          height={20}
          style={{ width: '20px', height: '20px' }}
          className={item > rating ? 'invert' : ''}
        />
      ))}
    </div>
  );
};

export default StarRating;
