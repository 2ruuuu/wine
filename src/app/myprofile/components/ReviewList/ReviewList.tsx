import ReviewListProps from './type';
import Taste from '@/components/taste/Taste';
import StarRating from '@/components/starRating/StarRating';
import Button from '@/components/Button/Button';

const ReviewList = ({ reviews }: ReviewListProps) => {
  return (
    <>
      {reviews.map((review) => (
        <article
          key={review.id}
          className="
            border-b border-gray-300
            pb-8 mb-8
            -ml-9 pl-9
          "
        >
          <div className="flex items-center gap-2">
            <StarRating rating={review.rating} />
            <strong>{review.rating}</strong>
            <span className="text-gray-400 text-[13px]">
              {review.createdAt}
            </span>
          </div>

          <div className="flex gap-4 mt-4">
            <div className="w-[42px] h-[70px] bg-gray-100" />

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
      ))}
    </>
  );
};

export default ReviewList;
