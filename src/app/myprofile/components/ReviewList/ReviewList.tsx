import ReviewListProps from './type';
import Taste from '@/components/Taste/Taste';
import StarRating from '@/components/StarRating/StarRating';
import Button from '@/components/Button/Button';
import { formatTimeAgo } from '@/lib/date-fns';
import Dropdown from '@/components/DropDown/Dropdown';

const ReviewList = ({ reviews }: ReviewListProps) => {
  return (
    <div className="max-w-[725px]">
      {reviews.map((review) => {
        const dropdownOptions = [
          { label: '수정하기', onSelect: () => console.log('수정', review.id) },
          { label: '삭제하기', onSelect: () => console.log('삭제', review.id) },
        ];

        return (
          <article
            key={review.id}
            className="relative border-b border-gray-300 pb-8 mb-8"
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

            <div className="mt-5 w-[520px] space-y-2">
              <div className="flex gap-8">
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
              </div>

              <div className="flex gap-8">
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
