import Mock from '@/mocks/wineDetail.json';

import Taste from '@/components/Taste/Taste';

const ReviewFlavor = () => {
  return (
    <div className="flex flex-col gap-8 max-w-[500px]">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-semibold">어떤 맛이 나나요?</span>
        <span className="text-gray-300">(47명 참여)</span>
      </div>
      <Taste variant="label-boxed-long" type="lightBold" value={3} />
    </div>
  );
};

export default ReviewFlavor;
