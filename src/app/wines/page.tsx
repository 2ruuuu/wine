import { wineListMockData } from '@/mocks/wineListMockData';
import SuggestedWineList from './components/SuggestedWineList/SuggestedWineList';
import { suggestedWinesMockData } from '@/mocks/suggestedWinesMockData';
import WineList from './components/WineList/WineList';

const WinesPage = () => {
  return (
    <div>
      <div className="bg-[url(@/assets/images/suggested-wine-background.png)] pt-38.5 pb-15 rounded-b-[88px]">
        <SuggestedWineList wines={suggestedWinesMockData} />
      </div>
      <WineList wines={wineListMockData} />
    </div>
  );
};

export default WinesPage;