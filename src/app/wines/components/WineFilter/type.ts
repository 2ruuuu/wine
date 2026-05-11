import { WineType } from '@/constants/chips';

export type WineFilterProps = {
  selectedWineTypes: WineType[];
  onToggleWineType: (wineType: WineType) => void;
  minPrice: number;
  maxPrice: number;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
  selectedRating: number | null;
  onChangeRating: (value: number | null) => void;
  onResetFilters: () => void;
  onApplyFilters: () => void;
};
