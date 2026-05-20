import { WineDetailResponse } from '@/app/wines/[id]/type';

export interface RatingAvgProps {
  wine: Pick<WineDetailResponse, 'avgRating'>;
}
