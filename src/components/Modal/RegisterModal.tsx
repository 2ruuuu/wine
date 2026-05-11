'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import type { WineListItem } from '@/app/myprofile/components/WineList/type';

import { useAuthStore } from '@/stores/useAuthStore';

import {
  wineTypeRedImage,
  wineTypeSparklingImage,
  wineTypeWhiteImage,
} from '@/constants/images';

import Button from '@/components/Button/Button';
import Chip from '@/components/Chip/Chip';
import PhotoInput from '@/components/Input/PhotoInput';
import TextInput from '@/components/Input/TextInput';

const WINE_TYPES = ['Red', 'White', 'Sparkling'] as const;
type WineType = (typeof WINE_TYPES)[number];

type WineFormData = {
  name: string;
  price: string;
  region: string;
  winePhoto: FileList;
};

type RegisterModalProps = {
  mode?: 'create' | 'edit';
  wine?: WineListItem;
  onUpdated?: () => void;
  onClose?: () => void;
};

const RegisterModal = ({
  mode = 'create',
  wine,
  onUpdated,
  onClose,
}: RegisterModalProps) => {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm<WineFormData>();
  const { accessToken } = useAuthStore();
  const [isSmallHeight, setIsSmallHeight] = useState(false);
  const [selectedWineType, setSelectedWineType] = useState<WineType | null>(
    null,
  );

  useEffect(() => {
    const checkHeight = () => {
      setIsSmallHeight(window.innerHeight <= 1000);
    };
    checkHeight();
    window.addEventListener('resize', checkHeight);
    return () => window.removeEventListener('resize', checkHeight);
  }, [setValue]);

  useEffect(() => {
    if (mode !== 'edit' || !wine) return;

    setValue('name', wine.name);
    setValue('price', String(wine.price));
    setValue('region', wine.region);

    if (wine.type === 'RED') setSelectedWineType('Red');
    if (wine.type === 'WHITE') setSelectedWineType('White');
    if (wine.type === 'SPARKLING') setSelectedWineType('Sparkling');
  }, [mode, wine, setValue]);

  const WINE_TYPE_IMAGE = {
    Red: wineTypeRedImage,
    White: wineTypeWhiteImage,
    Sparkling: wineTypeSparklingImage,
  };

  const WINE_TYPE_LABEL = {
    Red: 'red',
    White: 'white',
    Sparkling: 'sparkling',
  };
  const WINE_TYPE_VALUE = {
    Red: 'RED',
    White: 'WHITE',
    Sparkling: 'SPARKLING',
  } as const;

  const onSubmit = async (formData: WineFormData) => {
    if (!selectedWineType) {
      toast.error('와인 타입을 선택해주세요.');
      return;
    }

    const imageFile = formData.winePhoto?.[0];

    // Create 모드일 때 사진 필수
    if (!imageFile && mode !== 'edit') {
      toast.error('와인 사진을 등록해주세요.');
      return;
    }

    let imageUrl = wine?.image ?? '';

    // 사진이 새로 업로드된 경우
    if (imageFile) {
      const imageFormData = new FormData();
      imageFormData.append('image', imageFile);

      const imageRes = await fetch(
        'https://winereview-api.vercel.app/23-3/images/upload',
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${accessToken}` },
          body: imageFormData,
        },
      );

      const imageData = await imageRes.json();
      if (!imageRes.ok) {
        toast.error('이미지 업로드에 실패했습니다.');
        return;
      }
      imageUrl = imageData.url;
    }

    const wineBody = {
      name: formData.name,
      region: formData.region,
      image: imageUrl,
      price: Number(formData.price),
      type: WINE_TYPE_VALUE[selectedWineType],
    };

    const isEditMode = mode === 'edit' && wine?.id;

    const res = await fetch(
      isEditMode
        ? `https://winereview-api.vercel.app/23-3/wines/${wine.id}`
        : 'https://winereview-api.vercel.app/23-3/wines',
      {
        method: isEditMode ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(wineBody),
      },
    );

    const data = await res.json();
    if (!res.ok) {
      toast.error(
        isEditMode ? '와인 수정에 실패했습니다.' : '와인 등록에 실패했습니다.',
      );
      return;
    }

    toast.success(
      isEditMode ? '와인이 수정되었습니다.' : '와인이 등록되었습니다.',
    );

    onUpdated?.();
    router.refresh();
    onClose?.();
    window.location.reload();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`flex flex-col gap-6 ${isSmallHeight ? 'max-h-[400px] overflow-auto' : ''}`}
        >
          <PhotoInput
            label="와인 사진"
            name="winePhoto"
            register={register('winePhoto')}
            imageUrl={wine?.image}
          />
          <TextInput
            label="와인 이름"
            name="name"
            placeholder="와인 이름 입력"
            register={register('name')}
          />
          <TextInput
            label="가격"
            name="price"
            placeholder="가격 입력"
            register={register('price')}
            type="number"
          />

          <div>
            <h3 className="text-body-sm font-medium text-black mb-2">타입</h3>
            <div className="flex gap-[10px]">
              {WINE_TYPES.map((wineType) => (
                <Chip
                  key={wineType}
                  id={`wine-type-${wineType}`}
                  name="wineType"
                  value={wineType}
                  checked={selectedWineType === wineType}
                  onChange={() => setSelectedWineType(wineType)}
                  image={{
                    src: WINE_TYPE_IMAGE[wineType],
                    alt: WINE_TYPE_LABEL[wineType],
                    width: 32,
                    height: 32,
                  }}
                >
                  <span>{wineType}</span>
                </Chip>
              ))}
            </div>
          </div>

          <TextInput
            label="원산지"
            name="region"
            placeholder="원산지 입력"
            register={register('region')}
          />
        </div>
        <Button fullWidth className="mt-12" type="submit">
          {mode === 'edit' ? '와인 수정하기' : '와인 등록하기'}
        </Button>
      </form>
    </div>
  );
};

export default RegisterModal;
