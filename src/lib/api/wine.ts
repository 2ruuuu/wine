import { instance } from './axios';
import { WineDetailResponse } from '@/app/wines/[id]/type';

export const getWineDetail = async (
  id: number,
): Promise<WineDetailResponse> => {
  const response = await instance.get<WineDetailResponse>(`/wines/${id}`);
  return response.data;
};
