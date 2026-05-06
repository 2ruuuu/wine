'use client';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import PhotoInput from '@/components/Input/PhotoInput';
import TextInput from '@/components/Input/TextInput';
import Button from '@/components/Button/Button';
import Chip from '@/components/Chip/Chip';
import {
  wineTypeRedImage,
  wineTypeWhiteImage,
  wineTypeSparklingImage,
} from '@/constants/images';
import { useAuthStore } from '@/stores/useAuthStore';
import { useModal } from './ModalProvider';

const WINE_TYPES = ['Red', 'White', 'Sparkling'] as const;
type WineType = (typeof WINE_TYPES)[number];

type WineFormData = {
  name: string;
  price: string;
  region: string;
  winePhoto1: FileList;
};

const RegisterModal = () => {
  const { register, handleSubmit } = useForm<WineFormData>();

  const { accessToken } = useAuthStore();

  const [selectedWineType, setSelectedWineType] = useState<WineType | null>(
    null,
  );
  const { closeModal } = useModal();

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

  const onClickType = (wineType: WineType) => {
    setSelectedWineType(wineType);
  };

  const onSubmit = async (formData: WineFormData) => {
    if (!selectedWineType) {
      alert('와인 타입을 선택해주세요.');
      return;
    }

    // if (!accessToken) {
    //   alert('로그인이 필요합니다.');
    //   return;
    // }

    const imageFile = formData.winePhoto1?.[0];

    if (!imageFile) {
      alert('와인 사진을 등록해주세요.');
      return;
    }

    const imageFormData = new FormData();
    imageFormData.append('image', imageFile);

    const imageRes = await fetch(
      'https://winereview-api.vercel.app/23-3/images/upload',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: imageFormData,
      },
    );

    const imageData = await imageRes.json();

    if (!imageRes.ok) {
      console.log(imageData);
      alert('이미지 업로드에 실패했습니다.');
      return;
    }

    const imageUrl = imageData.url;

    const res = await fetch('https://winereview-api.vercel.app/23-3/wines', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name: formData.name,
        region: formData.region,
        image: imageUrl,
        price: Number(formData.price),
        type: WINE_TYPE_VALUE[selectedWineType],
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log(data);
      alert('와인 등록에 실패했습니다.');
      return;
    }

    console.log(data);
    alert('와인이 등록되었습니다.');
    closeModal();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <PhotoInput
          label="와인 사진"
          name="winePhoto1"
          register={register('winePhoto1')}
        />

        <TextInput
          label="와인 이름"
          placeholder="와인 이름 입력"
          register={register('name')}
          name="name"
        />

        <TextInput
          label="가격"
          placeholder="가격 입력"
          register={register('price')}
          name="price"
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
                onChange={() => onClickType(wineType)}
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
          placeholder="원산지 입력"
          register={register('region')}
          name="region"
        />

        <Button fullWidth className="mt-12" type="submit">
          와인 등록하기
        </Button>
      </form>
    </div>
  );
};

export default RegisterModal;
