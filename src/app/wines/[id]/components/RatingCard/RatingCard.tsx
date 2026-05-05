import Button from '@/components/Button/Button';
import RatingAvg from './RatingAvg/RatingAvg';
import RatingBar from './RatingBar/RatingBar';
import { RatingBarProps } from './RatingBar/type';

const RatingCard = ({ reviewCount, avgRatings }: RatingBarProps) => {
  return (
    <div className="flex flex-col gap-10 w-[285px]">
      <RatingAvg />
      <RatingBar reviewCount={reviewCount} avgRatings={avgRatings} />
      <Button>리뷰 남기기</Button>
    </div>
  );
};

export default RatingCard;
