import Mock from '@/mocks/wineDetail.json';
import IncenseList from '../IncenseList/IncenseList';

const Incense = () => {
  return (
    <div className="flex flex-col w-[500px] gap-[54px]">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-semibold">어떤 향이 있나요?</span>
        <span className="text-gray-300">({Mock.reviewCount}명 참여)</span>
      </div>
      <IncenseList />
    </div>
  );
};

export default Incense;
