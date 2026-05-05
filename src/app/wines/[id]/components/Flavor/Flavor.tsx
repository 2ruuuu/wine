import Taste from '@/components/Taste/Taste';
import { FlavorProps } from './type';

const Flavor = ({ wine }: FlavorProps) => {
  return (
    <div className="flex flex-col gap-8 max-w-[500px]">
      <div className="flex justify-between items-center">
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
