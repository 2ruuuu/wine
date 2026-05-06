'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '../Button/Button';
import Chip from '../Chip/Chip';
import StarRatingButton from '../StarRating/StarRatingButton';
import TasteButton from '../Taste/TasteButton';
import { WINE_FLAVOR_LABEL, WineFlavor } from '@/constants/chips';
import WineRecommend from '@/assets/images/wine-product-img.png';
import { Review } from '@/types/review';
import { instance } from '@/lib/api/axios';
import toast from 'react-hot-toast';

const TasteOption = [
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

interface ReviewModalProps {
  mode?: 'create' | 'edit';
  review?: Review;
  onUpdated?: (updatedReview: Review) => void;
  onClose?: () => void;
}

const ReviewModal = ({
  mode = 'create',
  review,
  onUpdated,
  onClose,
}: ReviewModalProps) => {
  const isEditMode = mode === 'edit' && !!review;

  const [isSmallHeight, setIsSmallHeight] = useState(false);
  const [rating, setRating] = useState(review?.rating ?? 0);
  const [content, setContent] = useState(review?.content ?? '');

  const [lightBold, setLightBold] = useState(review?.lightBold ?? 3);
  const [smoothTannic, setSmoothTannic] = useState(review?.smoothTannic ?? 3);
  const [drySweet, setDrySweet] = useState(review?.drySweet ?? 3);
  const [softAcidic, setSoftAcidic] = useState(review?.softAcidic ?? 3);

  const [selectedWineFlavors, setSelectedWineFlavors] = useState<WineFlavor[]>(
    (review?.aroma ?? []) as WineFlavor[],
  );
  useEffect(() => {
    const checkHeight = () => {
      setIsSmallHeight(window.innerHeight <= 1200);
    };

    checkHeight();

    window.addEventListener('resize', checkHeight);

    return () => {
      window.removeEventListener('resize', checkHeight);
    };
  }, []);
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };
  const onClickFlavor = (wineFlavor: WineFlavor) => {
    setSelectedWineFlavors((prev) =>
      prev.includes(wineFlavor)
        ? prev.filter((flavor) => flavor !== wineFlavor)
        : [...prev, wineFlavor],
    );
  };

  const handleSubmitReview = async () => {
    if (!isEditMode || !review) {
      toast.error('리뷰 수정 정보가 없습니다.');
      return;
    }

    if (!rating) {
      toast.error('별점을 선택해주세요.');
      return;
    }

    if (!content.trim()) {
      toast.error('리뷰 내용을 입력해주세요.');
      return;
    }

    try {
      const res = await instance.patch(`/reviews/${review.id}`, {
        rating,
        lightBold,
        smoothTannic,
        drySweet,
        softAcidic,
        aroma: selectedWineFlavors,
        content,
      });

      const updatedReview = {
        ...review,
        ...res.data,
        rating,
        lightBold,
        smoothTannic,
        drySweet,
        softAcidic,
        aroma: selectedWineFlavors,
        content,
      };

      onUpdated?.(updatedReview);
      toast.success('리뷰가 수정되었습니다.');
      onClose?.();
    } catch (error) {
      console.error('리뷰 수정 실패', error);
      toast.error('리뷰 수정에 실패했습니다.');
    }
  };

  return (
    <div>
      <form
        className={`flex flex-col gap-12 ${isSmallHeight ? 'max-h-[400px] overflow-auto' : ''}`}
      >
        <div className="flex flex-col gap-5">
          <div className="flex items-center border-b border-gray-200 pb-2">
            <div className="w-[62px] h-[96px]">
              {review?.wine.image ? (
                <img
                  src={review.wine.image}
                  alt={review.wine.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <Image
                  src={WineRecommend}
                  alt="와인 상품 이미지"
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            <div className="px-4">
              <p>{review?.wine.name ?? 'Sentinel Carbernet Sauvignon 2016'}</p>
              <p className="text-body-sm text-gray-400 mt-0.5">
                {review?.wine.region ?? 'Western Cape, South Africa'}
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <h3 className="text-body-sm text-[#a3a3a3]">별점 선택</h3>
            <StarRatingButton rating={rating} onChange={handleRatingChange} />
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full py-2 rounded-[4px] outline-none bg-white
          text-body-sm md:text-body-md text-[hsl(30, 2%, 19%)] 
          placeholder:text-body-sm md:placeholder:text-body-md placeholder:text-[hsl(0,0%,73%)] border border-gray-300 focus:border-gray-400 pr-9 pl-4 min-h-[120px]"
            placeholder="후기를 작성해주세요"
          />
        </div>

        <div>
          <h3 className="mb-6 text-heading-md">와인의 맛은 어땟나요?</h3>
          <div className="flex flex-col items-start gap-2">
            {TasteOption.map(({ label, min, max }) => (
              <div
                key={label}
                className="grid grid-cols-[auto_auto_1fr_auto] gap-x-2 gap-y-4 items-center w-full"
              >
                <span className="font-semibold text-sm whitespace-nowrap mr-2 w-[30px]">
                  {label}
                </span>
                <span className="text-xs text-gray-700 w-[50px] text-center">
                  {min}
                </span>
                <div className="w-full">
                  <TasteButton
                    initialValue={
                      label === '바디감'
                        ? lightBold
                        : label === '탄닌'
                          ? smoothTannic
                          : label === '당도'
                            ? drySweet
                            : softAcidic
                    }
                    onChange={(value) => {
                      if (label === '바디감') setLightBold(value);
                      if (label === '탄닌') setSmoothTannic(value);
                      if (label === '당도') setDrySweet(value);
                      if (label === '산미') setSoftAcidic(value);
                    }}
                  />
                </div>
                <span className="text-xs text-gray-700 w-[50px] text-center">
                  {max}
                </span>
              </div>
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
      </form>
      <Button fullWidth className="mt-12" onClick={handleSubmitReview}>
        {isEditMode ? '리뷰 수정하기' : '리뷰 남기기'}
      </Button>
    </div>
  );
};

export default ReviewModal;
