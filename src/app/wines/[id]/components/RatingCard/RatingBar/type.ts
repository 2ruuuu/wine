import { WineDetailResponse } from '@/app/wines/[id]/type';

export interface RatingBarProps {
  wine: Pick<
    WineDetailResponse,
    | 'id'
    | 'reviewCount'
    | 'avgRating'
    | 'avgRatings'
    | 'name'
    | 'image'
    | 'region'
  >;
}
