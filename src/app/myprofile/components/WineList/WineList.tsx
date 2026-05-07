import WineCard from './WineCard';
import { WineListProps } from './type';

const WineList = ({ wines, onDeleteWine, onUpdateWine }: WineListProps) => {
  return (
    <div className="grid grid-cols-1 gap-x-[70px] gap-y-12 min-[1280px]:grid-cols-2">
      {wines.map((wine) => (
        <WineCard
          key={wine.id}
          wine={wine}
          onDeleteWine={onDeleteWine}
          onUpdateWine={onUpdateWine}
        />
      ))}
    </div>
  );
};

export default WineList;
