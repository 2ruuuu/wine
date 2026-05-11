import StarRating from '@/components/StarRating/StarRating';

import { RatingAvgProps } from './type';

const RatingAvg = ({ avgRating }: RatingAvgProps) => {
  const safeRating = avgRating ?? 0;
  const AvgRatingFloor = Math.floor(safeRating);
  const AvgRating = safeRating.toFixed(1);

  return (
    <div className="flex xl:flex-row flex-col xl:gap-3.5 xl:max-w-[260px] md:flex-col md:gap-3 md:max-w-[140px] w-full items-center md:items-start xl:items-center xl:justify-start justify-center gap-3">
      <StarRating rating={AvgRatingFloor} className="" />
      <div>
        <span className="md:text-2xl text-[28px] font-bold">{AvgRating} </span>
        <span className="md:text-2xl text-[28px] font-bold text-gray-600">
          / 5.0
        </span>
      </div>
    </div>
  );
};

export default RatingAvg;
