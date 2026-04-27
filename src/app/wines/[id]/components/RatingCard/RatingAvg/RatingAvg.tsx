import StarRating from '@/components/StarRating/StarRating';
import Mock from '@/mocks/wineDetail.json';

const RatingAvg = () => {
  const AvgRatingFloor = Math.floor(Mock.avgRating);
  const AvgRating = Number(Mock.avgRating.toFixed(1));

  return (
    <div className="flex gap-3.5 max-w-[260px]">
      <StarRating rating={AvgRatingFloor} />
      <div>
        <span className="text-2xl font-bold">{AvgRating}</span>
        <span className="text-2xl font-bold text-gray-600">/5.0</span>
      </div>
    </div>
  );
};

export default RatingAvg;
