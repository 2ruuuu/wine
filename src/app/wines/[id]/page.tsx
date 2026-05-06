import Image from 'next/image';
import Flavor from './components/Flavor/Flavor';
import Incense from './components/Incense/Incense';
import RatingCard from './components/RatingCard/RatingCard';
import ReviewCardList from './components/ReviewCardList.tsx/ReviewCardList';
import Top from './components/Top/Top';
import { getWineDetail } from '@/lib/api/wine';
import { notFound } from 'next/navigation';

const Wine = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const wineData = await getWineDetail(Number(id));

  if (!wineData) notFound();

  return (
    <div>
      <div className="bg-gray-100 h-[410px] mb-[74px] mt-[70px] rounded-b-[90px] flex justify-center">
        <Top wine={wineData} />
      </div>
      <div className="container-layout ">
        <div className="flex justify-between">
          <Flavor wine={wineData} />
          <Incense
            reviewCount={wineData.reviewCount}
            aromaStats={wineData.aromaStats}
          />
        </div>
        <hr className="my-20 border-gray-300" />
        <div className="flex gap-12 justify-between">
          <ReviewCardList
            reviewCount={wineData.reviewCount}
            reviews={wineData.reviews}
          />
          <RatingCard
            reviewCount={wineData.reviewCount}
            avgRatings={wineData.avgRatings}
            wineId={Number(id)}
          />
        </div>
      </div>
    </div>
  );
};

export default Wine;
