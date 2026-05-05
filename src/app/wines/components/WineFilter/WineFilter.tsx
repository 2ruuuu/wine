import Button from "@/components/Button/Button";
import WineTypeFilter from "../WineTypeFilter/WineTypeFilter";
import WinePriceFilter from "../WinePriceFilter/WinePriceFilter";
import WineRatingFilter from "../WineRatingFilter/WineRatingFilter";
import { WineFilterProps } from "./type";

const WineFilter = ({
  selectedWineTypes,
  onToggleWineType,
  maxPrice,
  onMaxPriceChange,
  selectedRating,
  onChangeRating,
}: WineFilterProps) => {
  return (
    <form className="flex flex-col gap-12">
      <WineTypeFilter
        selectedWineTypes={selectedWineTypes}
        onToggleWineType={onToggleWineType}
      />
      <WinePriceFilter value={maxPrice} onChange={onMaxPriceChange} />
      <WineRatingFilter
        selectedRating={selectedRating}
        onChangeRating={onChangeRating}
      />
    </form>
  );
};

export default WineFilter;