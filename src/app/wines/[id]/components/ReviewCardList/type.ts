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

export interface ReviewCardListProps {
  reviewCount: number;
  reviews: Review[];
  wine: any;
}
