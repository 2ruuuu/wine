import Image from 'next/image';
import Link from 'next/link';
import { WineCardProps } from '@/app/wines/type';
import StarRating from '@/components/StarRating/StarRating';

const WineCard = ({ 
  id,
  name,
  image,
  avgRating,
  reviewCount,
  recentReview,
 }: WineCardProps) => {
  return (
    <Link href={`/wines/${id}`} className="block max-w-[370px] w-full transition-all duration-300 hover:scale-104">
      <div className="flex flex-col gap-6">
        <div className="flex justify-center items-center w-[370px] h-[360px] bg-[#F2F2F2]">
          <Image
            src={image}
            alt={name}
            height={288}
            width={75}
            className="h-72 w-auto"
          />
        </div>
        <div className="flex flex-col gap-3 divide-y divide-solid divide-[#D1D1D1]">
          <div className="flex flex-col gap-3 pb-[25px]">
            <div className="flex gap-3">
              <StarRating rating={avgRating} />
              <span className="text-body-sm text-[#A3A3A3]">{reviewCount}개의 후기</span>
            </div>
            <h2 className="text-heading-lg font-semibold">{name}</h2>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-body-md font-medium">최신 후기</h3>
            <p className="text-body-sm text-[#A3A3A3] line-clamp-2">
              {recentReview.content}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WineCard;