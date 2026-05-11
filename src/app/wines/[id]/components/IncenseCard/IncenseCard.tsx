import Image from 'next/image';

import { NoImage } from '@/constants/images';

interface IncenseCardProps {
  name: string;
  icon: any;
}

const AROMA_NAME_KOR: Record<string, string> = {
  CHERRY: '체리',
  BERRY: '베리',
  OAK: '오크',
  VANILLA: '바닐라',
  PEPPER: '후추',
  BAKING: '베이킹',
  GRASS: '풀',
  APPLE: '사과',
  PEACH: '복숭아',
  CITRUS: '시트러스',
  TROPICAL: '트로피컬',
  MINERAL: '미네랄',
  FLOWER: '꽃',
  TOBACCO: '담배',
  EARTH: '흙',
  CHOCOLATE: '초콜릿',
  SPICE: '스파이스',
  CARAMEL: '카라멜',
  LEATHER: '가죽',
};

const IncenseCard = ({ name, icon }: IncenseCardProps) => {
  const isNoImage = name === 'noImage';
  const displayName = AROMA_NAME_KOR[name] || name;

  return (
    <div className="flex w-[100px] flex-col items-center gap-6">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl">
        <Image
          src={icon || NoImage}
          alt={displayName}
          fill
          className="object-cover"
          sizes="100px"
          priority={!isNoImage}
        />
      </div>
      <p className="w-full text-center text-[16px] font-semibold text-gray-800">
        {isNoImage ? '-' : displayName}
      </p>
    </div>
  );
};

export default IncenseCard;
