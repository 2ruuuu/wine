export interface User {
  id: number;
  nickname: string;
  image: string;
}

export interface WineInfo {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
  avgRating: number;
}

export interface ReviewItem {
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
  user: User;
  isLiked: boolean;
  likeCount: number;
  wine: WineInfo;
}

export interface MyReviewsResponse {
  list: ReviewItem[];
  totalCount: number;
  nextCursor: number | null;
  totalLikeCount: number;
}

export interface RecentReview {
  id: number;
  rating: number;
  aroma: string[];
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface MyWineItem {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
  avgRating: number;
  reviewCount: number;
  recentReview: RecentReview | null;
  userId: number;
}

export interface MyWinesResponse {
  totalCount: number;
  nextCursor: number | null;
  list: MyWineItem[];
}

export type ProfileTabType = 'review' | 'wine';

export interface MyProfileForm {
  nickname: string;
  profileImage: FileList;
}
