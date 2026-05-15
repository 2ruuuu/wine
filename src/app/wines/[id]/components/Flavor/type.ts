import { WineDetailResponse } from '../../type';

export interface FlavorProps {
  wine: Pick<WineDetailResponse, 'reviewStats' | 'reviewCount'>;
}
