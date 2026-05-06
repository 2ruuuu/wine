'use client';
import Button from '@/components/Button/Button';
import RatingAvg from './RatingAvg/RatingAvg';
import RatingBar from './RatingBar/RatingBar';
import { RatingBarProps } from './RatingBar/type';
import { useModal } from '@/components/Modal/ModalProvider';

const RatingCard = ({ wineId, reviewCount, avgRatings }: RatingBarProps) => {
  const { openModal } = useModal();
  return (
    <div className="flex flex-col gap-10 w-[285px]">
      <RatingAvg />
      <RatingBar
        wineId={wineId}
        reviewCount={reviewCount}
        avgRatings={avgRatings}
      />
      <Button
        variant="primary"
        className="w-[283px]"
        onClick={() =>
          openModal({
            type: 'review',
            wineId,
          })
        }
      >
        리뷰 남기기
      </Button>
    </div>
  );
};

export default RatingCard;
