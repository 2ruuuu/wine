'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '../Button/Button';
import Chip from '../Chip/Chip';
import StarRatingButton from '../StarRating/StarRatingButton';
import TasteButton from '../Taste/TasteButton';
import { WINE_FLAVOR_LABEL, WineFlavor } from '@/constants/chips';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/stores/useAuthStore';
import { useModal } from './ModalProvider';
import { ReviewFormData, Wine } from './type';
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
  {
    key: 'lightBold',
    label: '바디감',
    min: '가벼워요',
    max: '진해요',
  },
  {
    key: 'smoothTannic',
    label: '탄닌',
    min: '부드러워요',
    max: '떫어요',
  },
  {
    key: 'drySweet',
    label: '당도',
    min: '드라이해요',
    max: '달아요',
  },
  {
    key: 'softAcidic',
    label: '산미',
    min: '안셔요',
    max: '많이셔요',
  },
] as const;

const ReviewModal = ({ wineId }: { wineId: number }) => {
  const [isSmallHeight, setIsSmallHeight] = useState(false);
  const { register, handleSubmit } = useForm<ReviewFormData>();

  const { accessToken } = useAuthStore();

  const [wine, setWine] = useState<Wine | null>(null);
  const [rating, setRating] = useState(0);
  const { closeModal } = useModal();

  const [tasteValues, setTasteValues] = useState({
    lightBold: 3,
    smoothTannic: 3,
    drySweet: 3,
    softAcidic: 3,
  });

  const [selectedWineFlavors, setSelectedWineFlavors] = useState<WineFlavor[]>(
    [],
  );
  useEffect(() => {
    const checkHeight = () => {
      setIsSmallHeight(window.innerHeight <= 1000);
    };

    checkHeight();

    window.addEventListener('resize', checkHeight);

    return () => {
      window.removeEventListener('resize', checkHeight);
    };
  }, []);

  useEffect(() => {
    const getWine = async () => {
      const res = await fetch(
        `https://winereview-api.vercel.app/23-3/wines/${wineId}`,
      );

      const data = await res.json();

      if (!res.ok) {
        console.log(data);
        toast.error('와인 정보를 불러오지 못했습니다.');
        return;
      }

      setWine(data);
    };

    getWine();
  }, [wineId]);

  const handleTasteChange = (key: keyof typeof tasteValues, value: number) => {
    setTasteValues((prev) => ({
      ...prev,
      [key]: value,
    }));
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

    if (aroma.length !== selectedWineFlavors.length) {
      toast.error('등록할 수 없는 향이 있습니다.');
      return;
    }

    const reviewData = {
      rating,
      lightBold: tasteValues.lightBold,
      smoothTannic: tasteValues.smoothTannic,
      drySweet: tasteValues.drySweet,
      softAcidic: tasteValues.softAcidic,
      aroma,
      content: formData.content,
      wineId: wineId,
    };

    console.log('리뷰 등록 데이터:', reviewData);

    const res = await fetch('https://winereview-api.vercel.app/23-3/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(reviewData),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log('리뷰 등록 실패:', data);
      toast.error(data.message || '리뷰 등록에 실패했습니다.');
      return;
    }

    console.log(data);
    toast.success('리뷰 등록이 완료되었습니다.');
    closeModal();
  };

  if (!wine) {
    return <div>와인 정보를 불러오는 중...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className={`flex flex-col gap-12 ${isSmallHeight ? 'max-h-[400px] overflow-auto' : ''}`}
      >
        <div className="flex flex-col gap-5">
          <div className="flex items-center border-b border-gray-400 pb-2">
            <div className="relative w-[62px] h-[96px]">
              <Image
                src={wine.image}
                alt={wine.name}
                fill
                className="object-contain"
              />
            </div>

            <div className="px-4">
              <p>{wine.name}</p>
              <p className="text-body-sm text-gray-400 mt-0.5">{wine.region}</p>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <h3 className="text-body-sm text-[#a3a3a3]">별점 선택</h3>
            <StarRatingButton rating={rating} onChange={setRating} />
          </div>

          <textarea
            className="w-full py-2 rounded-[4px] outline-none bg-white
            text-body-sm md:text-body-md text-[hsl(30,2%,19%)]
            placeholder:text-body-sm md:placeholder:text-body-md placeholder:text-[hsl(0,0%,73%)]
            border border-gray-300 focus:border-gray-400 pr-9 pl-4 min-h-[120px]"
            placeholder="후기를 작성해주세요"
            {...register('content', { required: true })}
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
        리뷰 남기기
      </Button>
    </form>
  );
};

export default ReviewModal;
