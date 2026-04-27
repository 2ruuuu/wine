import Button from '@/components/Button/Button';
import RatingAvg from './RatingAvg/RatingAvg';
import RatingBar from './RatingBar/RatingBar';
import Mock from '@/mocks/wineDetail.json';

const RatingCard = () => {
  return (
    <div className="flex flex-col gap-10 max-w-[285px]">
      <RatingAvg />
      <RatingBar reviewCount={Mock.reviewCount} avgRatings={Mock.avgRatings} />
      <Button>리뷰 남기기</Button>
    </div>
  );
};

export default RatingCard;
