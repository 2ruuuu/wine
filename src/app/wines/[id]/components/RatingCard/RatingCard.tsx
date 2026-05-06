'use client';
import Button from '@/components/Button/Button';
import RatingAvg from './RatingAvg/RatingAvg';
import RatingBar from './RatingBar/RatingBar';
import { RatingBarProps } from './RatingBar/type';
import { useModal } from '@/components/Modal/ModalProvider';

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
    <div className="w-full xl:max-w-[285px] md:max-w-[640px] mx-auto">
      {/* 1. 모바일 전용 (기본값) */}
      <div className="flex md:hidden flex-col gap-10 w-full">
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
        <Button fullWidth={true} onClick={handleReviewCreate}>
          리뷰 남기기
        </Button>
      </div>
      {/* 2. 태블릿(md) 전용 */}
      <div className="hidden md:flex xl:hidden flex-row w-full justify-between items-start">
        <div className="flex flex-col gap-4 max-w-[280px] w-full">
          <RatingAvg avgRating={avgRating} />
          <Button fullWidth={false} onClick={handleReviewCreate}>
            리뷰 남기기
          </Button>
        </div>
        <div className="flex-1 max-w-[280px] w-full">
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
      <div className="hidden xl:flex flex-col gap-10 w-full">
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
        <Button fullWidth={true} onClick={handleReviewCreate}>
          리뷰 남기기
        </Button>
      </div>
    </div>
  );
};

export default RatingCard;
