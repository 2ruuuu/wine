import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getWineDetail } from '@/lib/api/wine';

import StarRating from '@/components/StarRating/StarRating';

import Flavor from './components/Flavor/Flavor';
import Incense from './components/Incense/Incense';
import RatingCard from './components/RatingCard/RatingCard';
import ReviewCardList from './components/ReviewCardList/ReviewCardList';
import Top from './components/Top/Top';

const Wine = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const wineData = await getWineDetail(Number(id));

  if (!wineData) notFound();

  return (
    <div>
      <div className="mb-[24px] flex h-[410px] justify-center rounded-b-[90px] bg-gray-100 px-4 py-10 md:mb-[74px] md:px-4">
        <Top wine={wineData} />
      </div>
      <div className="container-layout flex w-full flex-col justify-center gap-8 md:hidden">
        <div className="flex flex-col gap-3.5">
          <div className="flex h-[28px] items-center gap-4">
            <StarRating
              rating={wineData.avgRating}
              className="h-5 w-5 md:h-6 md:w-6 xl:h-[27px] xl:w-[27px]"
            />
            <span className="whitespace-nowrap text-gray-600">
              {wineData.reviewCount}개의 후기
            </span>
          </div>
          <p className="text-[28px] font-bold break-all">{wineData.name}</p>
          <p className="text-[18px] text-gray-600">{wineData.region}</p>
        </div>

        <span className="text-end text-[24px] font-semibold">
          {wineData.price.toLocaleString()}원
        </span>
        <hr className="container-layout mb-6 border-gray-300" />
      </div>

      <div className="container-layout md:pr-[30px] md:pl-[30px]">
        <div className="flex flex-col gap-12 md:flex-col md:items-stretch md:gap-24 xl:flex-row xl:items-start xl:justify-between">
          <div className="flex w-full md:justify-center">
            <Flavor wine={wineData} />
          </div>
          <div className="flex w-full md:justify-center">
            <Incense
              reviewCount={wineData.reviewCount}
              aromaStats={wineData.aromaStats}
            />
          </div>
        </div>
        <hr className="my-10 border-gray-300 md:my-20 xl:my-20" />
        <div className="flex flex-col-reverse gap-10 md:flex-col-reverse md:items-center md:gap-[77px] xl:flex-row xl:items-start xl:justify-between xl:gap-12">
          <ReviewCardList
            reviewCount={wineData.reviewCount}
            reviews={wineData.reviews}
            wine={{
              name: wineData.name,
              image: wineData.image,
              region: wineData.region,
            }}
          />
          <RatingCard
            id={wineData.id}
            wineId={wineData.id}
            reviewCount={wineData.reviewCount}
            avgRatings={wineData.avgRatings}
            avgRating={wineData.avgRating}
            name={wineData.name}
            image={wineData.image}
            region={wineData.region}
          />
        </div>
      </div>
    </div>
  );
};

export default Wine;
