'use client';

import { useMemo, useState } from 'react';
import { WineType } from '@/constants/chips';
import { WineCardProps } from '@/app/wines/components/WineCard/type';
import { WinesResultsSectionProps } from './type';
import WinesDesktopLayout from './WinesDesktopLayout';
import WinesMobileLayout from './WinesMobileLayout';

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
    if (
      selectedWineTypes.length > 0 &&
      !selectedWineTypes.some((t) => t === wine.type)
    ) {
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

  const wineFilterProps = {
    selectedWineTypes,
    onToggleWineType: handleToggleWineType,
    maxPrice,
    onMaxPriceChange: setMaxPrice,
    selectedRating,
    onChangeRating: setSelectedRating,
  };

  return (
    <div className="mx-auto w-full px-4 pt-[27px] md:pt-[33px] xl:pt-[55px]">
      <div className="hidden xl:block">
        <WinesDesktopLayout
          {...wineFilterProps}
          search={search}
          onSearchChange={setSearch}
          filteredWines={filteredWines}
        />
      </div>
      <div className="block xl:hidden">
        <WinesMobileLayout
          search={search}
          onSearchChange={setSearch}
          filteredWines={filteredWines}
          isFilterOpen={isFilterOpen}
          onOpenFilter={() => setIsFilterOpen(true)}
          onCloseFilter={() => setIsFilterOpen(false)}
        />
      </div>
    </div>
  );
};

export default WinesResultsSection;
