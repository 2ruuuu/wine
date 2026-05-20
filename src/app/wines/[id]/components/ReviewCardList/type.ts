import { WineDetailResponse } from '@/app/wines/[id]/type';

export interface ReviewCardListProps {
  wine: Pick<
    WineDetailResponse,
    'id' | 'name' | 'region' | 'image' | 'reviewCount' | 'reviews'
  >;
}
