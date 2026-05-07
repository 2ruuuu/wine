'use client';

import Link from 'next/link';

import ReviewListProps from './type';
import Taste from '@/components/Taste/Taste';
import StarRating from '@/components/StarRating/StarRating';
import Dropdown from '@/components/DropDown/Dropdown';

import { formatTimeAgo } from '@/lib/date-fns';

const ReviewList = ({
  reviews,
  onDeleteReview,
  onUpdateReview,
}: ReviewListProps) => {
  return (
    <div className="w-full">
      {reviews.map((review) => {
        const dropdownOptions = [
          { label: '수정하기', onSelect: () => onUpdateReview(review) },
          { label: '삭제하기', onSelect: () => onDeleteReview(review.id) },
        ];

        return (
          <article
            key={review.id}
            className="relative mb-8 w-full border-b border-gray-300 pb-8"
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
              <Link href={`/wines/${review.wine.id}`}>
                <img
                  src={review.wine.image}
                  alt={review.wine.name}
                  className="h-[70px] w-[42px] cursor-pointer bg-gray-100 object-contain"
                />
              </Link>

              <div>
                <Link
                  href={`/wines/${review.wine.id}`}
                  className="font-bold hover:underline"
                >
                  {review.wine.name}
                </Link>

                <p className="mt-1 text-[13px] text-gray-400">
                  {review.wine.region}
                </p>
              </div>
            </div>

            <p className="mt-5 whitespace-pre-line text-[14px] leading-[1.7]">
              {review.content}
            </p>

            <div className="mt-5 flex w-full flex-col gap-2 min-[744px]:grid min-[744px]:grid-cols-2 min-[744px]:gap-x-8 min-[744px]:gap-y-2">
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
          </article>
        );
      })}
    </div>
  );
};

export default ReviewList;
