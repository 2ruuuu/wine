'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useMemo, useState } from 'react';
import SuggestedWine from '../SuggestedWine/SuggestedWine';
import Button from '@/components/Button/Button';
import { ArrowLeft, ArrowRight } from '@/constants/icons';
import Image from 'next/image';
import { useShuffleWines } from '@/hooks/useShuffleWines';
import { getRecommendedWines } from '@/lib/api/wine';
import { SuggestedWineProps } from '@/app/wines/components/SuggestedWine/type';

const SuggestedWineList = () => {
  const [wines, setWines] = useState<SuggestedWineProps[]>([]);
  const [isLoading, setIsdLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setIsdLoading(true);
    getRecommendedWines(10)
      .then((data) => {
        if (!cancelled) setWines(data);
      })
      .catch(() => {
        if (!cancelled) setWines([]);
      })
      .finally(() => {
        if (!cancelled) setIsdLoading(false);
      });
      
    return () => {
      cancelled = true;
    };
  }, []);

  const orderedWines = useShuffleWines(wines);
  const slides =
    orderedWines.length > 0 ? orderedWines : wines;
  const slidesKey = useMemo(
    () => slides.map((w) => w.id).join(','),
    [slides],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 'auto',
    containScroll: 'trimSnaps',
    loop: true,
  });

  const [selectedSnap, setSelectedSnap] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const sync = () => {
      setSelectedSnap(emblaApi.selectedScrollSnap());
      setSnapCount(emblaApi.scrollSnapList().length);
    };

    emblaApi.reInit();
    emblaApi.scrollTo(0, true);
    sync();

    emblaApi.on('select', sync);
    emblaApi.on('reInit', sync);
    
    return () => {
      emblaApi.off('select', sync);
      emblaApi.off('reInit', sync);
    };
  }, [emblaApi, slidesKey]);

  const handlePrev = () => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  };

  const handleNext = () => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  };
  const isSinglePage = snapCount <= 1;

  if (isLoading) {
    return (
      <div className="w-[333px] md:w-[711px] xl:w-298.75 mx-auto">
        <h2 className="mt-[42px] md:mt-[30px] xl:mt-11 ml-[31px] md:ml-15 text-lg md:text-xl color-[hsl(var(--gray-800))] font-semibold">
          이번 달 추천 와인
        </h2>
        <p className="h-[243px] md:h-[320px] w-full flex items-center justify-center text-base md:text-lg text-center text-[#A3A3A3]">
          불러오는 중…
        </p>
      </div>
    );
  }

  if (wines.length === 0) {
    return (
      <div className="w-[333px] md:w-[711px] xl:w-298.75 mx-auto">
        <h2 className="mt-[42px] md:mt-[30px] xl:mt-11 ml-[31px] md:ml-15 text-lg md:text-xl color-[hsl(var(--gray-800))] font-semibold">
          이번 달 추천 와인
        </h2>
        <p className="h-[243px] md:h-[320px] w-full flex items-center justify-center text-base md:text-lg text-center text-[#A3A3A3]">
          추천 와인이 아직 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="w-[333px] md:w-[711px] xl:w-298.75 mx-auto">
      <h2 className="mt-[42px] md:mt-[30px] xl:mt-11 ml-[31px] md:ml-15 text-lg md:text-xl color-[hsl(var(--gray-800))] font-semibold">
        이번 달 추천 와인
      </h2>
      <div className="flex items-center gap-0 md:gap-[3px] xl:gap-5 mt-[19px] md:mt-[33px] xl:mt-9.75">
        <div className="hidden md:contents">
          <Button
            variant="arrow"
            onClick={handlePrev}
            disabled={isSinglePage}
            aria-label="이전 추천 와인 보기"
            icon={
              <Image src={ArrowLeft} alt="prev-wine-button" className="w-6 h-6" />
            }
          />
        </div>
        <div className="min-w-0 flex-1 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-[32px] md:gap-0">
            {slides.map((wine) => (
              <div
                key={wine.id}
                className="flex min-w-0 shrink-0 justify-center py-2 md:basis-1/3 xl:basis-1/4"
              >
                <SuggestedWine {...wine} />
              </div>
            ))}
          </div>
        </div>
        <div className="hidden md:contents">
          <Button
            variant="arrow"
            onClick={handleNext}
            disabled={isSinglePage}
            aria-label="다음 추천 와인 보기"
            icon={
              <Image
                src={ArrowRight}
                alt="next-wine-button"
                className="w-6 h-6"
              />
            }
          />
        </div>
      </div>

      {snapCount > 1 ? (
        <div className="mt-5 md:hidden">
          <div className="relative h-1 w-full overflow-hidden bg-[hsl(0,0%,92%)]">
            <div
              className="absolute top-0 h-full bg-[hsl(var(--gray-800))] transition-[left,width] duration-300 ease-out"
              style={{
                width: `${100 / snapCount}%`,
                left: `${(selectedSnap * 100) / snapCount}%`,
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedWineList;
