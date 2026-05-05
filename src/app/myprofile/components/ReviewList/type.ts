import { Review } from '@/types/review';

interface ReviewListProps {
  reviews: Review[];
  onDeleteReview: (reviewId: number) => void;
}

export default ReviewListProps;
