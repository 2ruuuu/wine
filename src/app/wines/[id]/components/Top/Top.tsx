import Image from 'next/image';

import StarRating from '@/components/StarRating/StarRating';

import { TopProps } from './type';

const Top = ({ wine }: TopProps) => {
  return (
    <div className="flex w-full max-w-[1140px] items-center justify-center md:gap-12">
      <div className="relative h-[250px] w-full max-w-[280px] shrink-0 md:h-[310px] md:max-w-[300px] xl:max-w-[420px]">
        <Image
          src={wine.image}
          alt="와인 이미지"
          fill
          priority
          sizes="(max-width: 1140px) 100vw, 1140px"
          className="object-contain mix-blend-multiply"
        />
      </div>
      <div className="hidden w-full max-w-[500px] flex-col justify-center gap-8 md:flex">
        <div className="flex flex-col gap-3.5">
          <div className="flex h-[28px] items-center gap-4">
            <StarRating
              rating={wine.avgRating}
              className="h-5 w-5 md:h-6 md:w-6 xl:h-[27px] xl:w-[27px]"
            />
            <span className="whitespace-nowrap text-gray-600">
              {wine.reviewCount}개의 후기
            </span>
          </div>
          <p className="font-bold break-all md:text-[32px] xl:text-[40px]">
            {wine.name}
          </p>
          <p className="text-[18px] text-gray-600">{wine.region}</p>
        </div>
        <span className="text-end text-2xl font-semibold">
          {wine.price.toLocaleString()}원
        </span>
      </div>
    </div>
  );
};

export default Top;
