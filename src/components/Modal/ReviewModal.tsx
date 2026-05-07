'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Review } from '@/types/review';
import { instance } from '@/lib/api/axios';
import { WINE_FLAVOR_LABEL, WineFlavor } from '@/constants/chips';
import { useAuthStore } from '@/stores/useAuthStore';
import { useModal } from './ModalProvider';
import { ReviewFormData, Wine } from './type';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '../Button/Button';
import Chip from '../Chip/Chip';
import StarRatingButton from '../StarRating/StarRatingButton';
import TasteButton from '../Taste/TasteButton';
import WineRecommend from '@/assets/images/wine-product-img.png';

import toast from 'react-hot-toast';

const AROMA_MAP: Partial<Record<WineFlavor, string>> = {
  [WineFlavor.Cherry]: 'CHERRY',
  [WineFlavor.Berry]: 'BERRY',
  [WineFlavor.Oak]: 'OAK',
  [WineFlavor.Vanilla]: 'VANILLA',
  [WineFlavor.Pepper]: 'PEPPER',
  [WineFlavor.Baking]: 'BAKING',
  [WineFlavor.Grass]: 'GRASS',
  [WineFlavor.Apple]: 'APPLE',
  [WineFlavor.Peach]: 'PEACH',
  [WineFlavor.Citrus]: 'CITRUS',
  [WineFlavor.Tropical]: 'TROPICAL',
  [WineFlavor.Mineral]: 'MINERAL',
  [WineFlavor.Floral]: 'FLOWER',
};

const TasteOption = [
  { key: 'lightBold', label: '바디감', min: '가벼워요', max: '진해요' },
  { key: 'smoothTannic', label: '탄닌', min: '부드러워요', max: '떫어요' },
  { key: 'drySweet', label: '당도', min: '드라이해요', max: '달아요' },
  { key: 'softAcidic', label: '산미', min: '안셔요', max: '많이셔요' },
] as const;

interface ReviewModalProps {
  mode?: 'create' | 'edit';
  review?: Review;
  wine?: { id: number; name: string; image: string; region: string };
  onUpdated?: (updatedReview: Review) => void;
  onClose?: () => void;
  wineId?: number;
}

const ReviewModal = ({
  mode = 'create',
  review,
  wine,
  onUpdated,
  onClose,
  wineId,
}: ReviewModalProps) => {
  const router = useRouter();
  const isEditMode = mode === 'edit' && !!review;
  const { register, handleSubmit, setValue } = useForm<ReviewFormData>();
  const { accessToken } = useAuthStore();
  const { closeModal } = useModal();
  const [isSmallHeight, setIsSmallHeight] = useState(false);
  const [fetchedWine, setFetchedWine] = useState<Wine | null>(
    review?.wine ?? wine ?? null,
  );
  const [rating, setRating] = useState(review?.rating ?? 0);
  const [selectedWineFlavors, setSelectedWineFlavors] = useState<WineFlavor[]>(
    (review?.aroma ?? []) as WineFlavor[],
  );

  const [tasteValues, setTasteValues] = useState({
    lightBold: review?.lightBold ?? 3,
    smoothTannic: review?.smoothTannic ?? 3,
    drySweet: review?.drySweet ?? 3,
    softAcidic: review?.softAcidic ?? 3,
  });

  useEffect(() => {
    if (isEditMode && review) {
      setValue('content', review.content);
    }

    const checkHeight = () => {
      setIsSmallHeight(window.innerHeight <= 1000);
    };
    checkHeight();
    window.addEventListener('resize', checkHeight);
    return () => window.removeEventListener('resize', checkHeight);
  }, [isEditMode, review, setValue]);

  useEffect(() => {
    if (isEditMode || !wineId) return;
    const getWine = async () => {
      const res = await fetch(
        `https://winereview-api.vercel.app/23-3/wines/${wineId}`,
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error('와인 정보를 불러오지 못했습니다.');
        return;
      }
      setFetchedWine(data);
    };
    getWine();
  }, [wineId, isEditMode]);

  const handleTasteChange = (key: keyof typeof tasteValues, value: number) => {
    setTasteValues((prev) => ({ ...prev, [key]: value }));
  };

  const onClickFlavor = (wineFlavor: WineFlavor) => {
    setSelectedWineFlavors((prev) =>
      prev.includes(wineFlavor)
        ? prev.filter((flavor) => flavor !== wineFlavor)
        : [...prev, wineFlavor],
    );
  };

  const onSubmit = async (formData: ReviewFormData) => {
    if (!accessToken) {
      toast.error('로그인이 필요합니다.');
      return;
    }
    if (rating === 0) {
      toast.error('별점을 선택해주세요.');
      return;
    }
    if (!formData.content.trim()) {
      toast.error('후기를 작성해주세요.');
      return;
    }
    if (selectedWineFlavors.length === 0) {
      toast.error('향을 하나 이상 선택해주세요.');
      return;
    }

    const aroma = selectedWineFlavors
      .map((flavor) => AROMA_MAP[flavor])
      .filter((flavor): flavor is string => Boolean(flavor));

    const reviewData = {
      rating,
      ...tasteValues,
      aroma,
      content: formData.content,
      //wineId: wineId ?? review?.wine.id, //2026-05-08 api에서 wineID가 없음
    };

    if (isEditMode && review) {
      try {
        const res = await instance.patch(`/reviews/${review.id}`, reviewData);
        onUpdated?.({ ...review, ...res.data, ...reviewData });
        toast.success('리뷰가 수정되었습니다.');
        onClose?.();
      } catch (error) {
        toast.error('리뷰 수정에 실패했습니다.');
      }
    } else {
      const res = await fetch(
        'https://winereview-api.vercel.app/23-3/reviews',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(reviewData),
        },
      );
      if (!res.ok) {
        toast.error('리뷰 등록에 실패했습니다.');
        return;
      }
      router.refresh();
      toast.success('리뷰 등록이 완료되었습니다.');
      closeModal();
    }
  };

  const displayWine = review?.wine || fetchedWine || wine;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className={`flex flex-col gap-12 ${isSmallHeight ? 'max-h-[400px] overflow-auto' : ''}`}
      >
        <div className="flex flex-col gap-5">
          <div className="flex items-center border-b border-gray-200 pb-2">
            <div className="w-[62px] h-[96px]">
              {displayWine?.image ? (
                <img
                  src={displayWine.image}
                  alt={displayWine.name}
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
              <p>{displayWine?.name ?? '와인 정보 로딩중...'}</p>
              <p className="text-body-sm text-gray-400 mt-0.5">
                {displayWine?.region ?? ''}
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <h3 className="text-body-sm text-[#a3a3a3]">별점 선택</h3>
            <StarRatingButton
              rating={rating}
              onChange={setRating}
              className=""
            />
          </div>

          <textarea
            {...register('content', { required: true })}
            className="w-full py-2 rounded-[4px] outline-none bg-white
            text-body-sm md:text-body-md text-[hsl(30,2%,19%)]
            placeholder:text-body-sm md:placeholder:text-body-md placeholder:text-[hsl(0,0%,73%)]
            border border-gray-300 focus:border-gray-400 pr-9 pl-4 min-h-[120px]"
            placeholder="후기를 작성해주세요"
          />
        </div>

        <div>
          <h3 className="mb-6 text-heading-md">와인의 맛은 어땠나요?</h3>
          <div className="flex flex-col items-start gap-2">
            {TasteOption.map(({ key, label, min, max }) => (
              <div
                key={key}
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
                    initialValue={tasteValues[key]}
                    onChange={(value) => handleTasteChange(key, value)}
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
            {Object.entries(WINE_FLAVOR_LABEL)
              .filter(([wineFlavor]) =>
                Boolean(AROMA_MAP[wineFlavor as WineFlavor]),
              )
              .map(([wineFlavor, label]) => (
                <Chip
                  key={wineFlavor}
                  id={`wine-flavor-${wineFlavor}`}
                  name="wineFlavor"
                  value={wineFlavor}
                  checked={selectedWineFlavors.includes(
                    wineFlavor as WineFlavor,
                  )}
                  onChange={() => onClickFlavor(wineFlavor as WineFlavor)}
                >
                  <span>{label}</span>
                </Chip>
              ))}
          </div>
        </div>
      </div>
      <Button type="submit" fullWidth className="mt-12">
        {isEditMode ? '리뷰 수정하기' : '리뷰 남기기'}
      </Button>
    </form>
  );
};

export default ReviewModal;
