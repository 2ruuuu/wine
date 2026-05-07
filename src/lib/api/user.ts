import { instance } from './axios';

export const getMyInfo = async () => {
  const response = await instance.get('/users/me');
  return response.data;
};

export const getMyReviews = async (limit = 10) => {
  const response = await instance.get('/users/me/reviews', {
    params: { limit },
  });

  return response.data;
};

export const getMyWines = async (limit = 10) => {
  const response = await instance.get('/users/me/wines', {
    params: { limit },
  });

  return response.data;
};

export const updateMyProfile = async (payload: {
  nickname?: string;
  image?: string | null;
}) => {
  const response = await instance.patch('/users/me', payload);

  return response.data;
};

export const uploadProfileImage = async (formData: FormData) => {
  const response = await instance.post('/images/upload', formData);

  return response.data;
};

export const deleteWine = async (wineId: number) => {
  const response = await instance.delete(`/wines/${wineId}`);

  return response.data;
};

export const deleteReview = async (reviewId: number) => {
  const response = await instance.delete(`/reviews/${reviewId}`);

  return response.data;
};
