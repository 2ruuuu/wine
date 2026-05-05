import { WineType } from "@/constants/chips";

export type WineFilterProps = {
  selectedWineTypes: WineType[];
  onToggleWineType: (wineType: WineType) => void;
  maxPrice: number;
  onMaxPriceChange: (value: number) => void;
  selectedRating: number | null;
  onChangeRating: (value: number | null) => void;
};