import IncenseList from '../IncenseList/IncenseList';
import { IncenseProps } from './type';

const Incense = ({ wine }: IncenseProps) => {
  const { reviewCount } = wine;

  return (
    <div className="flex w-full flex-col gap-[17px] md:max-w-[720px] md:flex-row md:gap-[63px] xl:max-w-[500px] xl:flex-col xl:gap-[54px]">
      <div className="flex flex-col md:flex-col md:items-start md:gap-[12px] xl:flex-row xl:items-center xl:justify-between">
        <span className="text-2xl font-semibold">어떤 향이 있나요?</span>
        <span className="text-gray-300">({reviewCount}명 참여)</span>
      </div>
      <IncenseList wine={wine} />
    </div>
  );
};

export default Incense;
