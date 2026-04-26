import RatingAvg from './RatingAvg/RatingAvg';
import RatingBar from './RatingBar/RatingBar';
import Mock from '@/mocks/wineDetail.json';

const RatingCard = () => {
  return (
    <div className="flex flex-col gap-10 max-w-[285px]">
      <RatingAvg />
      <RatingBar reviewCount={Mock.reviewCount} avgRatings={Mock.avgRatings} />
      <button className="bg-black text-white">리뷰 남기기</button>
    </div>
  );
};

export default RatingCard;
