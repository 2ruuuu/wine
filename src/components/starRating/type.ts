export interface StarRatingProps {
  rating: number;
}

export interface InteractiveStarProps extends StarRatingProps {
  onChange?: (rating: number) => void;
}
