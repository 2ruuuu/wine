import ReviewCard from '../ReviewCard/ReviewCard';
import Mock from '@/mocks/wineDetail.json';

const ReviewCardList = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3.5">
        <span className="text-2xl font-semibold">리뷰 목록</span>
        <span className="text-gray-600">
          {Mock.reviewCount.toLocaleString()}개
        </span>
      </div>
      <div className="flex flex-col items-end max-w-[780px]">
        {Mock.reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewCardList;
