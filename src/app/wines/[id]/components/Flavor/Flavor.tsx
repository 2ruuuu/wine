import Taste from '@/components/Taste/Taste';
import { FlavorProps } from './type';

const Flavor = ({ wine }: FlavorProps) => {
  return (
    <div className="flex xl:flex-col md:flex-row flex-col xl:gap-8 gap-4 xl:max-w-[500px] md:max-w-[680px] md:justify-between w-full">
      <div className="flex xl:flex-row md:flex-col flex-col md:gap-[12px] xl:justify-between md:items-start xl:items-center">
        <span className="text-2xl font-semibold">어떤 맛이 나나요?</span>
        <span className="text-gray-300">({wine.reviewCount}명 참여)</span>
      </div>
      <div className="flex flex-col gap-5">
        <Taste
          variant="label-boxed-long"
          value={wine.reviewStats.averageLightBold}
          type="lightBold"
        />
        <Taste
          variant="label-boxed-long"
          value={wine.reviewStats.averageSmoothTannic}
          type="smoothTannic"
        />
        <Taste
          variant="label-boxed-long"
          value={wine.reviewStats.averageDrySweet}
          type="drySweet"
        />
        <Taste
          variant="label-boxed-long"
          value={wine.reviewStats.averageSoftAcidic}
          type="softAcidic"
        />
      </div>
    </div>
  );
};

export default Flavor;
