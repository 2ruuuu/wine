import { Review } from '@/app/wines/[id]/type';

export interface HeartToggleProps {
  review: Pick<Review, 'id' | 'isLiked'>;
}
