export interface WineListItem {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
  avgRating: number;
  reviewCount: number;
  recentReview: null | string;
  userId: number;
}
