import Taste from '@/components/Taste/Taste';

import { FlavorProps } from './type';

const Flavor = ({ wine: { reviewCount, reviewStats } }: FlavorProps) => {
  return (
    <div className="flex w-full flex-col gap-4 md:max-w-[720px] md:flex-row md:gap-[63px] xl:flex-col xl:gap-8">
      <div className="flex shrink-0 flex-col md:flex-col md:items-start md:gap-[12px] xl:flex-row xl:items-center xl:justify-between">
        <span className="text-2xl font-semibold">어떤 맛이 나나요?</span>
        <span className="text-gray-300">({reviewCount}명 참여)</span>
      </div>
      <div className="flex w-full flex-1 flex-col gap-5">
        <Taste
          variant="label-boxed-long"
          value={reviewStats.averageLightBold}
          type="lightBold"
        />
        <Taste
          variant="label-boxed-long"
          value={reviewStats.averageSmoothTannic}
          type="smoothTannic"
        />
        <Taste
          variant="label-boxed-long"
          value={reviewStats.averageDrySweet}
          type="drySweet"
        />
        <Taste
          variant="label-boxed-long"
          value={reviewStats.averageSoftAcidic}
          type="softAcidic"
        />
      </div>
    </div>
  );
};

export default Flavor;
