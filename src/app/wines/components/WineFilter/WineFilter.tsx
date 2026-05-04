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
    <div className="flex flex-col gap-16">
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
      <Button variant="primary" fullWidth>등록하기</Button>
    </div>
  );
};

export default WineFilter;