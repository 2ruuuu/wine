'use client';

import type { GetWinesParams } from '@/app/wines/type';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { WineType } from '@/constants/chips';
import { WineCardProps } from '@/app/wines/components/WineCard/type';
import { getWines } from '@/lib/api/wine';
import WinesDesktopLayout from './WinesDesktopLayout';
import WinesMobileLayout from './WinesMobileLayout';

const PAGE_SIZE = 20;
const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 5_000_000;

const WinesResultsSection = () => {
  const [wines, setWines] = useState<WineCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
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

  const nextCursorRef = useRef<number | null>(null);
  const hasMoreRef = useRef(false);
  const isFetchingMoreRef = useRef(false);

  const listQuery = useMemo(
    () => ({
      minPrice: appliedMinPrice,
      maxPrice: appliedMaxPrice,
      rating: appliedRating,
      wineTypes: appliedWineTypes,
    }),
    [
      appliedMinPrice,
      appliedMaxPrice,
      appliedRating,
      appliedWineTypes,
    ],
  );

  const buildListParams = useCallback(
    (cursor?: number): GetWinesParams => {
      const p: GetWinesParams = {
        limit: PAGE_SIZE,
        minPrice: listQuery.minPrice,
        maxPrice: listQuery.maxPrice,
      };

      if (cursor != null) {
        p.cursor = cursor;
      }

      if (listQuery.rating != null) {
        p.rating = listQuery.rating;
      }

      if (listQuery.wineTypes.length === 1) {
        p.type = listQuery.wineTypes[0];
      }

      return p;
    },
    [listQuery],
  );

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setWines([]);
    setHasMore(false);
    nextCursorRef.current = null;
    hasMoreRef.current = false;

    getWines(buildListParams())
      .then((data) => {
        if (cancelled) {
          return;
        }
        setWines(data.list);
        nextCursorRef.current = data.nextCursor;
        const more = data.nextCursor != null;
        hasMoreRef.current = more;
        setHasMore(more);
      })
      .catch(() => {
        if (!cancelled) {
          setWines([]);
          nextCursorRef.current = null;
          hasMoreRef.current = false;
          setHasMore(false);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [buildListParams]);

  const loadMore = useCallback(async () => {
    if (isFetchingMoreRef.current || !hasMoreRef.current) {
      return;
    }

    const cursor = nextCursorRef.current;

    if (cursor == null) {
      return;
    }

    isFetchingMoreRef.current = true;

    try {
      const data = await getWines(buildListParams(cursor));
      setWines((prev) => [...prev, ...data.list]);
      nextCursorRef.current = data.nextCursor;
      const more = data.nextCursor != null;
      hasMoreRef.current = more;
      setHasMore(more);
    } catch {
      hasMoreRef.current = false;
      setHasMore(false);
    } finally {
      isFetchingMoreRef.current = false;
    }
  }, [buildListParams]);

  useEffect(() => {
    if (isLoading || !hasMore) {
      return;
    }

    const nearBottom = () => {
      const el = document.documentElement;
      const remaining = el.scrollHeight - el.scrollTop - el.clientHeight;
      return remaining < 480;
    };

    const onScroll = () => {
      if (!nearBottom()) {
        return;
      }
      
      loadMore();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [isLoading, hasMore, loadMore, wines.length]);

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

  const filteredWines = useMemo(() => {
    let list = wines;
    if (appliedWineTypes.length > 1) {
      list = list.filter((w) =>
        appliedWineTypes.some((t) => t === w.type),
      );
    }
    
    const q = search.trim().toLowerCase();

    if (!q) {
      return list;
    }

    return list.filter((w) =>
      `${w.name}`.toLowerCase().includes(q),
    );
  }, [wines, appliedWineTypes, search]);

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
          {...wineFilterProps}
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
