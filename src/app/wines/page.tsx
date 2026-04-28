import SuggestedWineList from './components/SuggestedWineList/SuggestedWineList';
import { suggestedWinesMockData } from '@/mocks/SuggestedWinesMockData';

const WineList = () => {
  return (
    <div className="bg-[url(@/assets/images/suggested-wine-background.png)] pt-38.5 pb-15 rounded-b-[88px]">
      <SuggestedWineList wines={suggestedWinesMockData} />
    </div>
  );
};

export default WineList;
