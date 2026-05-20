import { RatingBarProps } from './type';

const RatingBar = ({ wine }: RatingBarProps) => {
  const { avgRatings, reviewCount } = wine;
  const scores = ['5', '4', '3', '2', '1'];

  return (
    <div className="flex w-full flex-col gap-3">
      {scores.map((score) => {
        const count = avgRatings[score] || 0;
        const percentage = reviewCount > 0 ? (count / reviewCount) * 100 : 0;

        return (
          <div key={score} className="flex items-center gap-4">
            <span className="min-w-[30px] shrink-0 text-sm text-gray-600">
              {score}점
            </span>
            <div className="relative h-1.5 w-full rounded-full bg-gray-100">
              <div
                className="absolute h-full rounded-full bg-[hsl(var(--black))] transition-all duration-500 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RatingBar;
