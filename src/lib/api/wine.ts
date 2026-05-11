import { WineDetailResponse } from '@/app/wines/[id]/type';
import { SuggestedWineProps } from '@/app/wines/components/SuggestedWine/type';
import { GetWinesParams, WinesResponse } from '@/app/wines/type';

import { instance } from './axios';

export const getWines = async (
  params: GetWinesParams,
): Promise<WinesResponse> => {
  const response = await instance.get<WinesResponse>('/wines', {
    params,
  });
  return response.data;
};

export const getRecommendedWines = async (
  limit = 10,
): Promise<SuggestedWineProps[]> => {
  const response = await instance.get<SuggestedWineProps[]>(
    '/wines/recommended',
    {
      params: { limit },
    },
  );
  return response.data;
};

export const getWineDetail = async (
  id: number,
): Promise<WineDetailResponse> => {
  const response = await instance.get<WineDetailResponse>(`/wines/${id}`);
  return response.data;
};
