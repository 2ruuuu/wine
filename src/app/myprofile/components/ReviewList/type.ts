import { Review } from '@/types/review';

interface ReviewListProps {
  reviews: Review[];
  onDeleteReview: (reviewId: number) => void;
  onUpdateReview: (review: Review) => void;
}

export default ReviewListProps;
