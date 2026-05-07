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
    isLiked: boolean;
    user: {
      id: number;
      nickname: string;
      image: string | null;
    };
    wine?:
      | {
          id: number;
          name: string;
          image: string;
          region: string;
        }
      | undefined;
    likeCount?: number | undefined;
  };
  wine: {
    name: string;
    image: string;
    region: string;
  };
}
