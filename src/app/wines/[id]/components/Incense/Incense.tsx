import Mock from '@/mocks/wineDetail.json';
import IncenseList from '../IncenseList/IncenseList';
import { IncenseProps } from './type';

const Incense = ({ reviewCount, aromaStats }: IncenseProps) => {
  return (
    <div className="flex flex-col max-w-[500px] gap-[54px]">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-semibold">어떤 향이 있나요?</span>
        <span className="text-gray-300">({reviewCount}명 참여)</span>
      </div>
      <IncenseList aromaStats={aromaStats} />
    </div>
  );
};

export default Incense;
