import { WineType } from '@/constants/chips';

export type SuggestedWineProps = {
  id: number;
  name: string;
  region: string;
  image: string;
};

export type WineCardProps = SuggestedWineProps & {
  price: number;
  type: WineType;
  avgRating: number;
  reviewCount: number;
  recentReview: {
    user: {
      id: number;
      nickname: string;
      image: string;
    };
    updatedAt: string;
    createdAt: string;
    content: string;
    aroma: string[];
    rating: number;
    id: number;
  };
  userId: number;
};