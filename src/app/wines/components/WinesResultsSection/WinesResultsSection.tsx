'use client';

import { useEffect, useMemo, useState } from 'react';
import { WineType } from '@/constants/chips';
import { WineCardProps } from '@/app/wines/components/WineCard/type';
import { getWines } from '@/lib/api/wine';
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
  minPrice: number,
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
    if (wine.price < minPrice || wine.price > maxPrice) return false;
    if (!matchesRatingBucket(wine.avgRating, selectedRating)) return false;
    if (q) {
      const haystack = `${wine.name} ${wine.region}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
};

const WinesResultsSection = () => {
  const DEFAULT_MIN_PRICE = 0;
  const DEFAULT_MAX_PRICE = 250000;

  const [wines, setWines] = useState<WineCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedWineTypes, setSelectedWineTypes] = useState<WineType[]>([]);
  const [minPrice, setMinPrice] = useState(DEFAULT_MIN_PRICE);
  const [maxPrice, setMaxPrice] = useState(DEFAULT_MAX_PRICE);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [appliedWineTypes, setAppliedWineTypes] = useState<WineType[]>([]);
  const [appliedMinPrice, setAppliedMinPrice] = useState(DEFAULT_MIN_PRICE);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(DEFAULT_MAX_PRICE);
  const [appliedRating, setAppliedRating] = useState<number | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    const typeParam = appliedWineTypes.length === 1 ? appliedWineTypes[0] : undefined;

    getWines({
      limit: 10,
      minPrice: appliedMinPrice,
      maxPrice: appliedMaxPrice,
      rating: appliedRating ?? undefined,
      type: typeParam,
    })
      .then((data) => {
        if (!cancelled) setWines(data.list);
      })
      .catch(() => {
        if (!cancelled) setWines([]);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [
    appliedWineTypes,
    appliedMinPrice,
    appliedMaxPrice,
    appliedRating,
  ]);

  const handleToggleWineType = (wineType: WineType) => {
    setSelectedWineTypes((prev) =>
      prev.includes(wineType)
        ? prev.filter((type) => type !== wineType)
        : [...prev, wineType],
    );
  };

  const handleMinPriceChange = (value: number) => {
    const nextMin = Math.max(0, value);
    setMinPrice(nextMin);
    setMaxPrice((prev) => (prev < nextMin ? nextMin : prev));
  };

  const handleMaxPriceChange = (value: number) => {
    const nextMax = Math.max(minPrice, value);
    setMaxPrice(nextMax);
  };

  const handleApplyFilters = () => {
    setAppliedWineTypes(selectedWineTypes);
    setAppliedMinPrice(minPrice);
    setAppliedMaxPrice(maxPrice);
    setAppliedRating(selectedRating);
  };

  const handleResetFilters = () => {
    setSelectedWineTypes([]);
    setMinPrice(DEFAULT_MIN_PRICE);
    setMaxPrice(DEFAULT_MAX_PRICE);
    setSelectedRating(null);
    setAppliedWineTypes([]);
    setAppliedMinPrice(DEFAULT_MIN_PRICE);
    setAppliedMaxPrice(DEFAULT_MAX_PRICE);
    setAppliedRating(null);
  };

  const filteredWines = useMemo(
    () =>
      filterWines(
        wines,
        search,
        appliedWineTypes,
        appliedMinPrice,
        appliedMaxPrice,
        appliedRating,
      ),
    [
      wines,
      search,
      appliedWineTypes,
      appliedMinPrice,
      appliedMaxPrice,
      appliedRating,
    ],
  );

  const wineFilterProps = {
    selectedWineTypes,
    onToggleWineType: handleToggleWineType,
    minPrice,
    maxPrice,
    onMinPriceChange: handleMinPriceChange,
    onMaxPriceChange: handleMaxPriceChange,
    selectedRating,
    onChangeRating: setSelectedRating,
    onResetFilters: handleResetFilters,
    onApplyFilters: handleApplyFilters,
  };

  if (isLoading) {
    return (
      <div className="mx-auto w-full px-4 pt-[27px] md:pt-[33px] xl:pt-[55px]">
        <p className="text-center text-[#A3A3A3]">와인 목록을 불러오는 중...</p>
      </div>
    );
  }

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
