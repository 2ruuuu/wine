'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useMemo, useState } from 'react';
import SuggestedWine from '../SuggestedWine/SuggestedWine';
import { SuggestedWineListProps } from './type';
import Button from '@/components/Button/Button';
import { ArrowLeft, ArrowRight } from '@/constants/icons';
import Image from 'next/image';
import { useShuffleWines } from '@/hooks/useShuffleWines';

const SuggestedWineList = ({ wines }: SuggestedWineListProps) => {
  const orderedWines = useShuffleWines(wines);
  const slidesKey = useMemo(
    () => orderedWines.map((w) => w.id).join(','),
    [orderedWines],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 'auto',
    containScroll: 'trimSnaps',
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [selectedSnap, setSelectedSnap] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const sync = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
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

  const handlePrev = () => emblaApi?.scrollPrev();

  const handleNext = () => {
    if (!emblaApi) return;
    if (emblaApi.canScrollNext()) emblaApi.scrollNext();
    else emblaApi.scrollTo(0);
  };

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
            disabled={!canScrollPrev}
            aria-label="이전 추천 와인 보기"
            icon={
              <Image src={ArrowLeft} alt="prev-wine-button" className="w-6 h-6" />
            }
          />
        </div>
        <div className="min-w-0 flex-1 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-[32px] md:gap-0">
            {orderedWines.map((wine) => (
              <div
                key={wine.id}
                className="flex min-w-0 shrink-0 justify-center md:basis-1/3 xl:basis-1/4"
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
