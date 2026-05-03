import { wineListMockData } from '@/mocks/wineListMockData';
import SuggestedWineList from './components/SuggestedWineList/SuggestedWineList';
import { suggestedWinesMockData } from '@/mocks/suggestedWinesMockData';
import WinesResultsSection from './components/WinesResultsSection/WinesResultsSection';

const WinesPage = () => {
  return (
    <div className="mb-21">
      <div className="bg-[url(@/assets/images/suggested-wine-background.png)] pt-38.5 pb-15 rounded-b-[88px]">
        <SuggestedWineList wines={suggestedWinesMockData} />
      </div>
      <WinesResultsSection wines={wineListMockData} />
    </div>
  );
};

export default WinesPage;