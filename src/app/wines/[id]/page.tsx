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
      <div className="bg-gray-100 h-[410px] md:mb-[74px] mb-[24px] rounded-b-[90px] flex justify-center px-4 md:px-4 py-10">
        <Top wine={wineData} />
      </div>
      <div className="container-layout flex md:hidden flex-col justify-center gap-8 w-full">
        <div className="flex flex-col gap-3.5">
          <div className="flex items-center gap-4 h-[28px]">
            <StarRating
              rating={wineData.avgRating}
              className="w-5 h-5 md:w-6 md:h-6 xl:w-[27px] xl:h-[27px]"
            />
            <span className="text-gray-600 whitespace-nowrap">
              {wineData.reviewCount}개의 후기
            </span>
          </div>
          <p className="text-[28px] font-bold">{wineData.name}</p>
          <p className="text-[18px] text-gray-600">{wineData.region}</p>
        </div>

        <span className="text-end text-[24px] font-semibold">
          {wineData.price.toLocaleString()}원
        </span>
        <hr className="container-layout mb-6 border-gray-300" />
      </div>

      <div className="container-layout md:pr-[30px] md:pl-[30px]">
        <div className="flex xl:justify-between xl:flex-row md:flex-col flex-col md:items-center xl:items-start md:gap-24 gap-12">
          <Flavor wine={wineData} />
          <Incense
            reviewCount={wineData.reviewCount}
            aromaStats={wineData.aromaStats}
          />
        </div>
        <hr className="xl:my-20 md:my-20 my-10 border-gray-300" />
        <div className="flex xl:flex-row xl:gap-12 xl:justify-between md:flex-col-reverse flex-col-reverse gap-10 md:gap-[77px]">
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
