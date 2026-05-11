import Button from '@/components/Button/Button';

import WinePriceFilter from '../WinePriceFilter/WinePriceFilter';
import WineRatingFilter from '../WineRatingFilter/WineRatingFilter';
import WineTypeFilter from '../WineTypeFilter/WineTypeFilter';
import { WineFilterProps } from './type';

const WineFilter = ({
  selectedWineTypes,
  onToggleWineType,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  selectedRating,
  onChangeRating,
  onResetFilters,
  onApplyFilters,
}: WineFilterProps) => {
  return (
    <form
      className="flex flex-col gap-12"
      onSubmit={(e) => {
        e.preventDefault();
        onApplyFilters();
      }}
    >
      <WineTypeFilter
        selectedWineTypes={selectedWineTypes}
        onToggleWineType={onToggleWineType}
      />
      <WinePriceFilter
        minValue={minPrice}
        maxValue={maxPrice}
        onChangeMin={onMinPriceChange}
        onChangeMax={onMaxPriceChange}
      />
      <WineRatingFilter
        selectedRating={selectedRating}
        onChangeRating={onChangeRating}
      />
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          fullWidth
          onClick={onResetFilters}
        >
          초기화
        </Button>
        <Button type="submit" variant="primary" fullWidth>
          필터 적용하기
        </Button>
      </div>
    </form>
  );
};

export default WineFilter;
