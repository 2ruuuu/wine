import WineCard from './WineCard';
import { WineListItem } from './type';

interface WineListProps {
  wines: WineListItem[];
}

const WineList = ({ wines }: WineListProps) => {
  return (
    <div className="-ml-9 pl-9">
      <div className="grid grid-cols-2 gap-x-12 gap-y-14">
        {wines.map((wine) => (
          <WineCard key={wine.id} wine={wine} />
        ))}
      </div>
    </div>
  );
};

export default WineList;
