import WineCard from '@/app/wines/components/WineCard/WineCard';
import { WineListProps } from './type';

const WineList = ({ wines }: WineListProps) => {
  return (
    <div className="grid md:grid-cols-2 md:gap-x-4 gap-y-12 xl:gap-15 xl:w-[801px] mx-auto">
      {wines.map((wine) => (
        <div key={wine.id}>
          <WineCard {...wine} />
        </div>
      ))}
    </div>
  );
};

export default WineList;