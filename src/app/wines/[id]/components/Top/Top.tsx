import Image from 'next/image';
import StarRating from '@/components/StarRating/StarRating';
import { TopProps } from './type';

const Top = ({ wine }: TopProps) => {
  return (
    <div className="flex justify-center max-w-[1140px] w-full gap-12">
      <div className="relative w-[420px] h-[310px] shrink-0">
        <Image
          src={wine.image}
          alt="와인 이미지"
          fill
          priority
          sizes="(max-width: 1140px) 100vw, 1140px"
          className="object-contain mix-blend-multiply"
        />
      </div>
      <div className="hidden md:flex flex-col justify-center gap-8 max-w-[500px] w-full">
        <div className="flex flex-col gap-3.5">
          <div className="flex items-center gap-4 h-[28px]">
            <StarRating
              rating={wine.avgRating}
              className="w-5 h-5 md:w-6 md:h-6 xl:w-[27px] xl:h-[27px]"
            />
            <span className="text-gray-600 whitespace-nowrap">
              {wine.reviewCount}개의 후기
            </span>
          </div>
          <p className="xl:text-[40px] md:text-[32px] font-bold">{wine.name}</p>
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
