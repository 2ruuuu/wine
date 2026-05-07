import { instance } from './axios';
import { WineDetailResponse } from '@/app/wines/[id]/type';

export interface PatchReviewRequestBody {
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
}

export interface PostReviewRequestBody {
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
  wineId: number;
}

export interface DeleteReviewResponse {
  id: number;
}

export const postReviewLike = async (
  id: number,
): Promise<WineDetailResponse> => {
  const response = await instance.post<WineDetailResponse>(
    `/reviews/${id}/like`,
  );
  return response.data;
};

export const deleteReviewLike = async (
  id: number,
): Promise<WineDetailResponse> => {
  const response = await instance.delete<WineDetailResponse>(
    `/reviews/${id}/like`,
  );
  return response.data;
};

export const patchReview = async (id: number, data: PatchReviewRequestBody) => {
  const response = await instance.patch(`/reviews/${id}`, data);
  return response.data;
};

export const deleteReview = async (
  id: number,
): Promise<DeleteReviewResponse> => {
  const response = await instance.delete<DeleteReviewResponse>(
    `/reviews/${id}`,
  );
  return response.data;
};

export const postReview = async (data: PostReviewRequestBody) => {
  const response = await instance.post('/reviews', data);
  return response.data;
};
