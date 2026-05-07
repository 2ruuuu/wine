export interface User {
  id: number;
  nickname: string;
  image: string | null;
}

export interface Review {
  id: number;
  rating: number;
  aroma: string[];
  content: string;
  createdAt: string;
  updatedAt: string;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  user: User;
  isLiked: boolean;
  likes?: any[];
}

export interface WineDetailResponse {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
  avgRating: number;
  reviewCount: number;
  recentReview: Review;
  userId: number;
  reviews: Review[];

  avgRatings: Record<string, number>;

  reviewStats: {
    averageLightBold: number;
    averageSmoothTannic: number;
    averageDrySweet: number;
    averageSoftAcidic: number;
  };

  aromaStats: Record<string, number>;
}
