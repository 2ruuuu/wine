import StarRating from '@/components/StarRating/StarRating';

import { RatingAvgProps } from './type';

const RatingAvg = ({ avgRating }: RatingAvgProps) => {
  const safeRating = avgRating ?? 0;
  const AvgRatingFloor = Math.floor(safeRating);
  const AvgRating = safeRating.toFixed(1);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 md:max-w-[140px] md:flex-col md:items-start md:gap-3 xl:max-w-[260px] xl:flex-row xl:items-center xl:justify-start xl:gap-3.5">
      <StarRating rating={AvgRatingFloor} className="" />
      <div>
        <span className="text-[28px] font-bold md:text-2xl">{AvgRating} </span>
        <span className="text-[28px] font-bold text-gray-600 md:text-2xl">
          / 5.0
        </span>
      </div>
    </div>
  );
};

export default RatingAvg;
