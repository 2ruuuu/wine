import { Review, WineDetailResponse } from '@/app/wines/[id]/type';

interface ReviewCardItem extends Omit<Review, 'wine' | 'likeCount'> {
  wineId?: number;
  teamId?: string;
  likeCount?: number;
}

export interface ReviewCardProps {
  review: ReviewCardItem;
  wine: Pick<WineDetailResponse, 'id' | 'name' | 'region' | 'image'>;
}
