'use client';

import { useState } from 'react';
import Button from '@/components/Button/Button';
import { WineType } from '@/constants/chips';
import WineTypeFilter from '../WineTypeFilter/WineTypeFilter';
import WinePriceFilter from '../WinePriceFilter/WinePriceFilter';
import WineRatingFilter from '../WineRatingFilter/WineRatingFilter';
import { useModal } from '@/components/Modal/ModalProvider';

const WineFilter = () => {
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
  const { openModal } = useModal();
  return (
    <div className="flex flex-col gap-16">
      <form className="flex flex-col gap-12">
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
      <Button
        variant="primary"
        fullWidth
        onClick={() => openModal({ type: 'register' })}
      >
        등록하기
      </Button>
    </div>
  );
};

export default WineFilter;
