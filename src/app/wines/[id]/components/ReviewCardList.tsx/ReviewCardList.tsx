import ReviewCard from '../ReviewCard/ReviewCard';
import { ReviewCardListProps } from './type';

const ReviewCardList = ({ reviewCount, reviews }: ReviewCardListProps) => {
  return (
    <div className="flex flex-col gap-5 w-full max-w-[780px]">
      <div className="flex items-center gap-3.5">
        <span className="text-2xl font-semibold">리뷰 목록</span>
        <span className="text-gray-600">{reviewCount.toLocaleString()}개</span>
      </div>
      <div className="flex flex-col items-end">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewCardList;
