import WineTypeFilter from '@/app/wines/components/WineTypeFilter/WineTypeFilter';
import WinePriceFilter from '@/app/wines/components/WinePriceFilter/WinePriceFilter';
import WineRatingFilter from '@/app/wines/components/WineRatingFilter/WineRatingFilter';
import { WineType } from '@/constants/chips';
import { useState } from 'react';
import Button from '../Button/Button';

const FilterModal = () => {
  const [selectedWineTypes, setSelectedWineTypes] = useState<WineType[]>([]);
  const [maxPrice, setMaxPrice] = useState(250000);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleToggleWineType = (wineType: WineType) => {
    setSelectedWineTypes((prev) =>
      prev.includes(wineType)
        ? prev.filter((type) => type !== wineType)
        : [...prev, wineType],
    );
  };
  return (
    <>
      <form className="flex flex-col gap-12 mb-10">
        <WineTypeFilter
          selectedWineTypes={selectedWineTypes}
          onToggleWineType={handleToggleWineType}
        />
        <WinePriceFilter value={maxPrice} onChange={setMaxPrice} />
        <WineRatingFilter
          selectedRating={selectedRating}
          onChangeRating={setSelectedRating}
        />
      </form>
      <div className="flex gap-2">
        <Button variant="outline" fullWidth>
          초기화
        </Button>
        <Button variant="primary" fullWidth>
          필터 적용하기
        </Button>
      </div>
    </>
  );
};

export default FilterModal;
