import ReviewListProps from './type';
import Taste from '@/components/Taste/Taste';
import StarRating from '@/components/StarRating/StarRating';
import Button from '@/components/Button/Button';
import { formatTimeAgo } from '@/lib/date-fns';
import Dropdown from '@/components/DropDown/Dropdown';
import { useModal } from '@/components/Modal/ModalProvider';

const ReviewList = ({
  reviews,
  onDeleteReview,
  onUpdateReview,
}: ReviewListProps) => {
  const { openModal } = useModal();

  return (
    <div className="w-full">
      {reviews.map((review) => {
        const dropdownOptions = [
          { label: '수정하기', onSelect: () => onUpdateReview(review) },
          {
            label: '삭제하기',
            onSelect: () =>
              openModal({
                type: 'delete',
                onConfirm: () => onDeleteReview(review.id),
              }),
          },
        ];

        return (
          <article
            key={review.id}
            className="
              relative
              w-full
              border-b
              border-gray-300
              pb-8
              mb-8
            "
          >
            <div className="relative flex items-center gap-2">
              <StarRating rating={review.rating} />
              <strong>{review.rating}</strong>
              <span className="text-gray-400 text-[13px]">
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
                      className="text-gray-400 text-[20px] leading-none"
                    >
                      ⋮
                    </button>
                  )}
                </Dropdown>
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <img
                src={review.wine.image}
                alt={review.wine.name}
                className="w-[42px] h-[70px] object-contain bg-gray-100"
              />

              <div>
                <strong>{review.wine.name}</strong>
                <p className="text-gray-400 text-[13px] mt-1">
                  {review.wine.region}
                </p>
              </div>
            </div>

            <p className="mt-5 leading-[1.7] text-[14px] whitespace-pre-line">
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

            <Button variant="outline" className="mt-5 px-3.5 py-2">
              ♡ {review.likeCount}
            </Button>
          </article>
        );
      })}
    </div>
  );
};

export default ReviewList;
