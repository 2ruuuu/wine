export interface ReviewCardProps {
  review: {
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
    user: {
      id: number;
      nickname: string;
      image: string | null;
    };
    isLiked: boolean;
  };
}
