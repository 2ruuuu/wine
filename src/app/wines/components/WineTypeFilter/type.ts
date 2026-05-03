import { WineType } from "@/constants/chips";

export type WineTypeFilterProps = {
  selectedWineTypes: WineType[];
  onToggleWineType: (wineType: WineType) => void;
};

