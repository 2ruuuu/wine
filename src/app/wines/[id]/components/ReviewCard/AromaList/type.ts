import { Review } from '@/app/wines/[id]/type';

export interface AromaListProps {
  review: Pick<Review, 'aroma'>;
}
