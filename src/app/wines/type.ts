import type { WineType } from '@/constants/chips';

export interface User {
  id: number;
  nickname: string;
  image: string | null;
}

export interface RecentReview {
  user: User;
  updatedAt: string;
  createdAt: string;
  content: string;
  aroma: string[];
  rating: number;
  id: number;
}

export interface WineResponse {
  id: number;
  name: string;
  region: string;
  image: string | null;
  price: number;
  type: WineType;
  avgRating: number;
  reviewCount: number;
  recentReview: RecentReview;
  userId: number;
}

export interface WinesResponse {
  totalCount: number;
  nextCursor: number | null;
  list: WineResponse[];
}
