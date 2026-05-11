import Mock from '@/mocks/wineDetail.json';

import Taste from '@/components/Taste/Taste';

const ReviewFlavor = () => {
  return (
    <div className="flex max-w-[500px] flex-col gap-8">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-semibold">어떤 맛이 나나요?</span>
        <span className="text-gray-300">(47명 참여)</span>
      </div>
      <Taste variant="label-boxed-long" type="lightBold" value={3} />
    </div>
  );
};

export default ReviewFlavor;
