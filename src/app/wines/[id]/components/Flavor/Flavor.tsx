import Taste from '@/components/Taste/Taste';
import Mock from '@/mocks/wineDetail.json';

const Flavor = () => {
  return (
    <div className="flex flex-col gap-8 w-[500px]">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-semibold">어떤 맛이 나나요?</span>
        <span className="text-gray-300">({Mock.reviewCount}명 참여)</span>
      </div>
      <div className="flex flex-col gap-5">
        <Taste
          variant="label-boxed-long"
          value={Mock.reviewStats.averageLightBold}
          type="lightBold"
        />
        <Taste
          variant="label-boxed-long"
          value={Mock.reviewStats.averageSmoothTannic}
          type="smoothTannic"
        />
        <Taste
          variant="label-boxed-long"
          value={Mock.reviewStats.averageDrySweet}
          type="drySweet"
        />
        <Taste
          variant="label-boxed-long"
          value={Mock.reviewStats.averageSoftAcidic}
          type="softAcidic"
        />
      </div>
    </div>
  );
};

export default Flavor;
