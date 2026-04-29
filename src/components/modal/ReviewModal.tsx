'use client';
import { useState } from 'react';
import Image from 'next/image';
import Button from '../Button/Button';
import Chip from '../Chip/Chip';
import StarRating from '../StarRating/StarRating';
import TasteButton from '../taste/TasteButton';
import { WINE_FLAVOR_LABEL, WineFlavor } from '@/constants/chips';
import WineRecommend from '@/assets/images/wine-product-img.png';

const TASTE_OPTIONS = [
  {
    label: '바디감',
    min: '가벼워요',
    max: '진해요',
  },
  {
    label: '탄닌',
    min: '부드러워요',
    max: '떫어요',
  },
  {
    label: '당도',
    min: '드라이해요',
    max: '달아요',
  },
  {
    label: '산미',
    min: '안셔요',
    max: '많이셔요',
  },
] as const;
const ReviewModal = () => {
  const [selectedWineFlavors, setSelectedWineFlavors] = useState<WineFlavor[]>(
    [],
  );

  const onClickFlavor = (wineFlavor: WineFlavor) => {
    setSelectedWineFlavors((prev) =>
      prev.includes(wineFlavor)
        ? prev.filter((flavor) => flavor !== wineFlavor)
        : [...prev, wineFlavor],
    );
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-5">
        <div className="flex items-center border-b border-gray-200 pb-2">
          <div className="w-[62px] h-[96px]">
            <Image
              src={WineRecommend}
              alt="와인 상품 이미지"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="px-4">
            <p>Sentinel Carbernet Sauvignon 2016</p>
            <p className="text-body-sm text-gray-400 mt-0.5">
              Western Cape, South Africa
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <h3 className="text-body-sm text-[#a3a3a3]">별점 선택</h3>
          <StarRating rating={3} />
        </div>
        <textarea
          className="w-full py-2 rounded-[4px] outline-none bg-white
            text-body-sm md:text-body-md text-[hsl(30, 2%, 19%)] 
            placeholder:text-body-sm md:placeholder:text-body-md placeholder:text-[hsl(0,0%,73%)] border border-gray-300 focus:border-gray-400 pr-9 pl-4 min-h-[120px]"
          placeholder="후기를 작성해주세요"
        ></textarea>
      </div>

      <div>
        <h3 className="mb-6 text-heading-md">와인의 맛은 어땟나요?</h3>
        <div className="flex flex-col items-start">
          {TASTE_OPTIONS.map(({ label, min, max }) => (
            <TasteButton
              key={label}
              label={label}
              min={min}
              max={max}
              type="lightBold"
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-6 text-heading-md">기억에 남는 향이 있나요?</h3>
        <div className="flex flex-wrap gap-[10px]">
          {Object.entries(WINE_FLAVOR_LABEL).map(([wineFlavor, label]) => (
            <Chip
              key={wineFlavor}
              id={`wine-flavor-${wineFlavor}`}
              name="wineFlavor"
              value={wineFlavor}
              checked={selectedWineFlavors.includes(wineFlavor as WineFlavor)}
              onChange={() => onClickFlavor(wineFlavor as WineFlavor)}
            >
              <span>{label}</span>
            </Chip>
          ))}
        </div>
      </div>
      <Button fullWidth>리뷰 남기기</Button>
    </div>
  );
};

export default ReviewModal;
