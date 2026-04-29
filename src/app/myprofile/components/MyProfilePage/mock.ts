import { MyReviewsResponse, MyWinesResponse } from './type';

export const mockMyReviews: MyReviewsResponse = {
  list: [
    {
      id: 1,
      rating: 5,
      lightBold: 3,
      smoothTannic: 4,
      drySweet: 2,
      softAcidic: 3,
      aroma: ['CHERRY'],
      content:
        '첫 모금에서 느껴지는 진한 블랙베리와 블랙커런트의 깊은 풍미가 인상적이었어요.',
      createdAt: '2026-04-29T00:23:35.211Z',
      updatedAt: '2026-04-29T00:23:35.211Z',
      user: {
        id: 1,
        nickname: '주말엔와인',
        image: '',
      },
      isLiked: false,
      likeCount: 24,
      wine: {
        type: 'RED',
        avgRating: 4.5,
        price: 35000,
        image: '',
        region: 'Western Cape, South Africa',
        name: 'Sentinel Cabernet Sauvignon 2016',
        id: 1,
      },
    },
  ],
  totalCount: 1,
  nextCursor: null,
  totalLikeCount: 24,
};

export const mockMyWines: MyWinesResponse = {
  totalCount: 1,
  nextCursor: null,
  list: [
    {
      id: 1,
      name: 'Sentinel Cabernet Sauvignon 2016',
      region: 'Western Cape, South Africa',
      image: '',
      price: 35000,
      type: 'RED',
      avgRating: 4.5,
      reviewCount: 8,
      recentReview: {
        user: {
          id: 1,
          nickname: '주말엔와인',
          image: '',
        },
        updatedAt: '2026-04-29T00:24:02.744Z',
        createdAt: '2026-04-29T00:24:02.744Z',
        content: '묵직하고 향이 좋아요.',
        aroma: ['CHERRY'],
        rating: 5,
        id: 1,
      },
      userId: 1,
    },
  ],
};
