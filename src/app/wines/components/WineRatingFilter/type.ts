export type WineRatingFilterProps = {
  selectedRating: number | null;
  onChangeRating: (rating: number | null) => void;
};
