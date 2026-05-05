import { wineListMockData } from '@/mocks/wineListMockData';
import SuggestedWineList from './components/SuggestedWineList/SuggestedWineList';
import WinesResultsSection from './components/WinesResultsSection/WinesResultsSection';

const WinesPage = () => {
  return (
    <div className="mb-21">
      <div className="bg-[url(@/assets/images/suggested-wine-background.png)] pt-[85px] md:pt-[127px] xl:pt-38.5 pb-7 md:pb-11 xl:pb-15 xl:rounded-b-[88px]">
        <SuggestedWineList />
      </div>
      <WinesResultsSection wines={wineListMockData} />
    </div>
  );
};

export default WinesPage;