'use client';
import { useAuthStore } from '@/stores/useAuthStore';

import Button from '@/components/Button/Button';
import { useModal } from '@/components/Modal/ModalProvider';

import RatingAvg from './RatingAvg/RatingAvg';
import RatingBar from './RatingBar/RatingBar';
import { RatingBarProps } from './RatingBar/type';

const RatingCard = ({
  reviewCount,
  avgRatings,
  avgRating,
  name,
  image,
  region,
  id,
}: RatingBarProps) => {
  const { openModal } = useModal();

  const user = useAuthStore((state) => state.user);
  const isLoggedIn = !!user;

  const handleReviewCreate = () => {
    openModal({
      type: 'review',
      mode: 'create',
      wineId: id,
      wine: {
        id: id,
        name: name,
        image: image,
        region: region,
      },
    });
  };

  return (
    <div className="mx-auto w-full md:max-w-[720px] xl:max-w-[285px]">
      {/* 1. 모바일 전용 (기본값) */}
      <div className="flex w-full flex-col gap-10 md:hidden">
        <div className="flex gap-4">
          <RatingAvg avgRating={avgRating} />
          <RatingBar
            id={id}
            wineId={id}
            avgRating={avgRating}
            reviewCount={reviewCount}
            avgRatings={avgRatings}
            name={name}
            image={image}
            region={region}
          />
        </div>
        {isLoggedIn && (
          <Button fullWidth={true} onClick={handleReviewCreate}>
            리뷰 남기기
          </Button>
        )}
      </div>
      {/* 2. 태블릿(md) 전용 */}
      <div className="hidden w-full flex-row items-start justify-between md:flex md:max-w-[720px] xl:hidden">
        <div className="flex w-full max-w-[300px] flex-col gap-4">
          <RatingAvg avgRating={avgRating} />
          {isLoggedIn && (
            <Button fullWidth={false} onClick={handleReviewCreate}>
              리뷰 남기기
            </Button>
          )}
        </div>
        <div className="w-full max-w-[360px] flex-1">
          <RatingBar
            id={id}
            wineId={id}
            avgRating={avgRating}
            reviewCount={reviewCount}
            avgRatings={avgRatings}
            name={name}
            image={image}
            region={region}
          />
        </div>
      </div>
      {/* 3. 데스크탑(xl) 전용 */}
      <div className="hidden w-full flex-col gap-10 xl:flex">
        <RatingAvg avgRating={avgRating} />
        <RatingBar
          id={id}
          wineId={id}
          avgRating={avgRating}
          reviewCount={reviewCount}
          avgRatings={avgRatings}
          name={name}
          image={image}
          region={region}
        />
        {isLoggedIn && (
          <Button fullWidth={true} onClick={handleReviewCreate}>
            리뷰 남기기
          </Button>
        )}
      </div>
    </div>
  );
};

export default RatingCard;
