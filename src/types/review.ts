export type Wine = {
  id: number;
  name: string;
  region: string;
  image: string;
  type: 'RED' | 'WHITE' | 'SPARKLING' | 'ROSE';
  price: number;
  avgRating: number;
};

export type Review = {
  id: number;
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  isLiked: boolean;
  wine: Wine;
  user: {
    id: number;
    nickname: string;
    image: string | null;
  };
};
