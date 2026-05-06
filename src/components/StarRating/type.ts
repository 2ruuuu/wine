export interface StarRatingProps {
  rating: number;
  className?: string;
}

export interface InteractiveStarProps extends StarRatingProps {
  onChange?: (rating: number) => void;
}
