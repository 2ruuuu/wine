import IncenseList from '../IncenseList/IncenseList';
import { IncenseProps } from './type';

const Incense = ({ reviewCount, aromaStats }: IncenseProps) => {
  return (
    <div className="flex xl:flex-col md:flex-row flex-col xl:gap-8 xl:max-w-[500px] md:max-w-[680px] md:justify-between w-full gap-[54px]">
      <div className="flex xl:flex-row md:flex-col flex-col md:gap-[12px] xl:justify-between xl:items-center md:items-start">
        <span className="text-2xl font-semibold">어떤 향이 있나요?</span>
        <span className="text-gray-300">({reviewCount}명 참여)</span>
      </div>
      <IncenseList aromaStats={aromaStats} />
    </div>
  );
};

export default Incense;
