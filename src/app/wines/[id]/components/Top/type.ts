import { WineDetailResponse } from '../../type';

export interface TopProps {
  wine: Pick<
    WineDetailResponse,
    'image' | 'avgRating' | 'reviewCount' | 'name' | 'region' | 'price'
  >;
}
