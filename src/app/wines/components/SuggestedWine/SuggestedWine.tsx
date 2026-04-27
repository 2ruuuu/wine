import Image from 'next/image';
import { SuggestedWineProps } from '@/app/wines/type';

const SuggestedWine = ({ name, region, image }: SuggestedWineProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 w-50 h-80">
      <Image
        src={image}
        alt={`${name}-image`}
        width={62}
        height={228}
        className="h-57 w-auto"
      />
      <div className="flex flex-col justify-center items-center gap-2 text-center">
        <span className="text-base font-normal text-[#31302F]">{name}</span>
        <span className="text-sm font-normal text-[#A3A3A3]">{region}</span>
      </div>
    </div>
  );
};

export default SuggestedWine;
