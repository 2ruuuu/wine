'use client';

import { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import toast from 'react-hot-toast';

import ReviewListProps from './type';
import Taste from '@/components/Taste/Taste';
import StarRating from '@/components/StarRating/StarRating';
import Button from '@/components/Button/Button';
import Dropdown from '@/components/DropDown/Dropdown';

import { formatTimeAgo } from '@/lib/date-fns';
import { HeartEmpty, HeartFill } from '@/constants/icons';
import { postReviewLike, deleteReviewLike } from '@/lib/api/review';

const ReviewList = ({
  reviews,
  onDeleteReview,
  onUpdateReview,
}: ReviewListProps) => {
  const [likedMap, setLikedMap] = useState<Record<number, boolean>>({});

  const handleToggleHeart = async (reviewId: number, currentLiked: boolean) => {
    setLikedMap((prev) => ({
      ...prev,
      [reviewId]: !currentLiked,
    }));

    try {
      if (currentLiked) {
        await deleteReviewLike(reviewId);
        toast.success('좋아요를 취소했습니다.');
      } else {
        await postReviewLike(reviewId);
        toast.success('좋아요를 눌렀습니다!');
      }
    } catch (error) {
      setLikedMap((prev) => ({
        ...prev,
        [reviewId]: currentLiked,
      }));

      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;

        if (status === 403) {
          toast.error('본인의 리뷰에는 좋아요를 누를 수 없습니다.');
        } else if (status === 401) {
          toast.error('로그인이 필요한 기능입니다.');
        } else {
          toast.error('요청 처리에 실패했습니다.');
        }
      } else {
        toast.error('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="w-full">
      {reviews.map((review) => {
        const isLiked = likedMap[review.id] ?? review.isLiked;

        const dropdownOptions = [
          { label: '수정하기', onSelect: () => onUpdateReview(review) },
          { label: '삭제하기', onSelect: () => onDeleteReview(review.id) },
        ];

        return (
          <article
            key={review.id}
            className="
              relative
              mb-8
              w-full
              border-b
              border-gray-300
              pb-8
            "
          >
            <div className="relative flex items-center gap-2">
              <StarRating rating={review.rating} />

              <strong>{review.rating}</strong>

              <span className="text-[13px] text-gray-400">
                {formatTimeAgo(review.createdAt)}
              </span>

              <div className="absolute right-0 top-0">
                <Dropdown variant="basic" options={dropdownOptions}>
                  {({ toggle }) => (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggle();
                      }}
                      className="text-[20px] leading-none text-gray-400"
                    >
                      ⋮
                    </button>
                  )}
                </Dropdown>
              </div>
            </div>

            <div className="mt-4 flex gap-4">
              <img
                src={review.wine.image}
                alt={review.wine.name}
                className="h-[70px] w-[42px] object-contain bg-gray-100"
              />

              <div>
                <strong>{review.wine.name}</strong>

                <p className="mt-1 text-[13px] text-gray-400">
                  {review.wine.region}
                </p>
              </div>
            </div>

            <p className="mt-5 whitespace-pre-line text-[14px] leading-[1.7]">
              {review.content}
            </p>

            <div
              className="
                mt-5
                flex
                w-full
                flex-col
                gap-2
                min-[744px]:grid
                min-[744px]:grid-cols-2
                min-[744px]:gap-x-8
                min-[744px]:gap-y-2
              "
            >
              <Taste
                variant="label-boxed-short"
                type="lightBold"
                value={review.lightBold}
              />

              <Taste
                variant="label-boxed-short"
                type="smoothTannic"
                value={review.smoothTannic}
              />

              <Taste
                variant="label-boxed-short"
                type="drySweet"
                value={review.drySweet}
              />

              <Taste
                variant="label-boxed-short"
                type="softAcidic"
                value={review.softAcidic}
              />
            </div>

            <Button
              variant="outline"
              className={`mt-5 !flex !h-9 !w-[50px] !min-w-0 !items-center !justify-center !gap-0 !rounded-md !border-2 !p-0 !text-[0px] transition-colors ${
                isLiked ? '!border-[hsl(1,88%,40%)]' : '!border-gray-300'
              }`}
              onClick={() => handleToggleHeart(review.id, isLiked)}
            >
              <Image
                src={isLiked ? HeartFill : HeartEmpty}
                alt={isLiked ? '채워진 하트' : '빈 하트'}
                width={20}
                height={20}
                className="!h-5 !w-5"
              />
            </Button>
          </article>
        );
      })}
    </div>
  );
};

export default ReviewList;
