'use client';

import { useMemo, useState } from 'react';
import TextInput from '@/components/Input/TextInput';
import { WineType } from '@/constants/chips';
import { WineCardProps } from '@/app/wines/type';
import WineFilter from '../WineFilter/WineFilter';
import WineList from '../WineList/WineList';
import { WinesResultsSectionProps } from './type';

const matchesRatingBucket = (
  avgRating: number,
  bucket: number | null,
): boolean => {
  if (bucket === null) return true;
  if (bucket === 4.5) return avgRating >= 4.5 && avgRating <= 5;
  if (bucket === 4.0) return avgRating >= 4.0 && avgRating < 4.5;
  if (bucket === 3.5) return avgRating >= 3.5 && avgRating < 4.0;
  if (bucket === 3.0) return avgRating >= 3.0 && avgRating < 3.5;
  return true;
};

const filterWines = (
  wines: WineCardProps[],
  search: string,
  selectedWineTypes: WineType[],
  maxPrice: number,
  selectedRating: number | null,
): WineCardProps[] => {
  const q = search.trim().toLowerCase();

  return wines.filter((wine) => {
    if (selectedWineTypes.length > 0 && !selectedWineTypes.includes(wine.type)) {
      return false;
    }
    if (wine.price > maxPrice) return false;
    if (!matchesRatingBucket(wine.avgRating, selectedRating)) return false;
    if (q) {
      const haystack = `${wine.name} ${wine.region}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
};

const WinesResultsSection = ({ wines }: WinesResultsSectionProps) => {
  const [search, setSearch] = useState('');
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

  const filteredWines = useMemo(
    () =>
      filterWines(wines, search, selectedWineTypes, maxPrice, selectedRating),
    [wines, search, selectedWineTypes, maxPrice, selectedRating],
  );

  return (
    <div className="flex gap-15 max-w-[1145px] mx-auto pt-[55px]">
      <div className="flex-1">
        <WineFilter
          selectedWineTypes={selectedWineTypes}
          onToggleWineType={handleToggleWineType}
          maxPrice={maxPrice}
          onMaxPriceChange={setMaxPrice}
          selectedRating={selectedRating}
          onChangeRating={setSelectedRating}
        />
      </div>
      <div className="flex flex-col gap-16 max-w-[801px]">
        <TextInput
          id="wine-catalog-search"
          label="검색"
          type="search"
          placeholder="와인을 검색해 보세요"
          isSearch
          hideLabel
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <WineList wines={filteredWines} />
      </div>
    </div>
  );
};

export default WinesResultsSection;
