import WineCard from './WineCard';
import { WineListItem } from './type';

interface WineListProps {
  wines: WineListItem[];
  onDeleteWine: (wineId: number) => void;
}

const WineList = ({ wines, onDeleteWine }: WineListProps) => {
  return (
    <div className="-ml-9 pl-9">
      <div className="grid grid-cols-2 gap-x-12 gap-y-14">
        {wines.map((wine) => (
          <WineCard key={wine.id} wine={wine} onDeleteWine={onDeleteWine} />
        ))}
      </div>
    </div>
  );
};

export default WineList;
