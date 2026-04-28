'use client';

import { useMemo, useState } from 'react';
import SuggestedWine from '../SuggestedWine/SuggestedWine';
import { SuggestedWineListProps } from './type';
import Button from '@/components/Button/Button';
import { ArrowLeft, ArrowRight } from '@/constants/icons';
import Image from 'next/image';

const ITEMS_PER_PAGE = 4;

const SuggestedWineList = ({ wines }: SuggestedWineListProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(wines.length / ITEMS_PER_PAGE)),
    [wines.length],
  );
  const maxStartIndex = Math.max(0, wines.length - ITEMS_PER_PAGE);
  const startIndex = Math.min(currentPage * ITEMS_PER_PAGE, maxStartIndex);
  const trackTranslateX = `translateX(-${startIndex * (100 / ITEMS_PER_PAGE)}%)`;

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-298.75 mx-auto">
      <h2 className="mt-11 ml-15 text-xl color-[hsl(var(--gray-800))] font-semibold">
        이번 달 추천 와인
      </h2>
      <div className="flex items-center gap-4 mt-9.75">
        <Button
          variant="arrow"
          onClick={handlePrev}
          disabled={currentPage === 0}
          aria-label="이전 추천 와인 보기"
          icon={
            <Image src={ArrowLeft} alt="prev-wine-button" className="w-6 h-6" />
          }
        />
        <div className="flex-1 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: trackTranslateX }}
          >
            {wines.map((wine) => (
              <div key={wine.id} className="w-1/4 shrink-0">
                <div className="mx-auto w-fit">
                  <SuggestedWine {...wine} />
                </div>
              </div>
            ))}
          </div>
        </div>
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
  );
};

export default SuggestedWineList;
