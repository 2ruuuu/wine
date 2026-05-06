export interface RatingBarProps {
  id: number;
  reviewCount: number;
  avgRatings: Record<string, number>;
  avgRating: number;
  name: string;
  image: string;
  region: string;
  wineId: number;
}
