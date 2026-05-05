import { WineRatingFilterProps } from "./type";

const RATING_OPTIONS: Array<{ value: number | null; label: string }> = [
  { value: null, label: "전체" },
  { value: 4.5, label: "4.5 - 5.0" },
  { value: 4.0, label: "4.0 - 4.5" },
  { value: 3.5, label: "3.5 - 4.0" },
  { value: 3.0, label: "3.0 - 3.5" },
];

const WineRatingFilter = ({
  selectedRating,
  onChangeRating,
}: WineRatingFilterProps ) => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-bold">평점</h3>
      <div className="flex flex-col gap-3">
        {RATING_OPTIONS.map((option) => (
          <label
            key={option.label}
            htmlFor={`rating-${option.value ?? "all"}`}
            className="inline-flex items-center gap-2 cursor-pointer text-base"
          >
            <input
              id={`rating-${option.value ?? "all"}`}
              type="radio"
              name="rating"
              value={option.value ?? "all"}
              checked={selectedRating === option.value}
              onChange={() => onChangeRating(option.value)}
              className="h-4 w-4 appearance-none rounded-[4px] border border-gray-300 bg-white checked:border-[#666564] checked:bg-black checked:[box-shadow:inset_0_0_0_2px_#ffffff] focus:outline-none"
            />
            <span className="text-body-sm">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default WineRatingFilter;