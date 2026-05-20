import { WineDetailResponse } from '../../type';

export interface IncenseProps {
  wine: Pick<WineDetailResponse, 'aromaStats' | 'reviewCount' | 'name'>;
}
