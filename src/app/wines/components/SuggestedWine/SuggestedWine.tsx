import Image from 'next/image';
import { SuggestedWineProps } from '@/app/wines/type';

const SuggestedWine = ({ name, region, image }: SuggestedWineProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 w-[150px] h-[243px] xl:gap-4 xl:w-50 xl:h-80">
      <Image
        src={image}
        alt={`${name}-image`}
        width={62}
        height={228}
        className="h-[165px] w-auto xl:h-57 xl:w-auto"
      />
      <div className="flex flex-col justify-center items-center gap-[6px] xl:gap-2 text-center">
        <span className="text-sm xl:text-base font-normal text-[#31302F]">{name}</span>
        <span className="text-caption xl:text-sm font-normal text-[#A3A3A3]">{region}</span>
      </div>
    </div>
  );
};

export default SuggestedWine;
