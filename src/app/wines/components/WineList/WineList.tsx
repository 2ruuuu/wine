import WineCard from '@/app/wines/components/WineCard/WineCard';
import { WineListProps } from './type';

const WineList = ({ wines }: WineListProps) => {
  return (
    <div className="">
      {wines.map((wine) => (
        <div key={wine.id}>
          <WineCard {...wine} />
        </div>
      ))}
    </div>
  );
};

export default WineList;