import WineCard from '@/app/wines/components/WineCard/WineCard';
import { WineListProps } from './type';

const WineList = ({ wines }: WineListProps) => {
  return (
    <div className="grid grid-cols-2 gap-15 max-w-[801px] mx-auto">
      {wines.map((wine) => (
        <div key={wine.id}>
          <WineCard {...wine} />
        </div>
      ))}
    </div>
  );
};

export default WineList;