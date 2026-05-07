import WineTypeFilter from '@/app/wines/components/WineTypeFilter/WineTypeFilter';
import WinePriceFilter from '@/app/wines/components/WinePriceFilter/WinePriceFilter';
import WineRatingFilter from '@/app/wines/components/WineRatingFilter/WineRatingFilter';
import { WineFilterProps } from '@/app/wines/components/WineFilter/type';
import Button from '../Button/Button';

const FilterModal = ({
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
    <>
      <form
        className="flex flex-col gap-12 mb-10"
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
      </form>
      <div className="flex gap-2">
        <Button type="button" variant="outline" fullWidth onClick={onResetFilters}>
          초기화
        </Button>
        <Button type="button" variant="primary" fullWidth onClick={onApplyFilters}>
          필터 적용하기
        </Button>
      </div>
    </>
  );
};

export default FilterModal;
