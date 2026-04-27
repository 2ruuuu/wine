import Taste from '@/components/Taste/Taste';
import Mock from '@/mocks/wineDetail.json';

const ReviewFlavor = () => {
  return (
    <div className="flex flex-col gap-8 max-w-[500px]">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-semibold">어떤 맛이 나나요?</span>
        <span className="text-gray-300">(47명 참여)</span>
      </div>
      <Taste variant="label-boxed-long" type="lightBold" value={} />
    </div>
  );
};

export default ReviewFlavor;

//어떤 맛이 나나요 데이터 어딨는지 물어보기
