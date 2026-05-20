import { WineDetailResponse } from '../../type';

export interface IncenseListProps {
  wine: Pick<WineDetailResponse, 'aromaStats' | 'name'>;
}
