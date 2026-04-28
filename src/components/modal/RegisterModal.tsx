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

const WINE_TYPES = ['Red', 'White', 'Sparkling'] as const;
type WineType = (typeof WINE_TYPES)[number];

const RegisterModal = () => {
  const { register } = useForm();

  const [selectedWineType, setSelectedWineType] = useState<WineType | null>(
    null,
  );

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

  const onClickType = (wineType: WineType) => {
    setSelectedWineType(wineType);
  };

  console.log(WINE_TYPES);
  return (
    <div>
      <form className="flex flex-col gap-6">
        <PhotoInput label="와인 사진" register={register('winePhoto1')} />
        <TextInput label="와인 이름" placeholder="와인 이름 입력" />
        <TextInput label="가격" placeholder="가격 입력" />

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

        <TextInput label="원산지" placeholder="원산지 입력" />
      </form>

      <Button fullWidth className="mt-12">
        와인 등록하기
      </Button>
    </div>
  );
};

export default RegisterModal;
