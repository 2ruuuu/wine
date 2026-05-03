import { wineListMockData } from '@/mocks/wineListMockData';
import SuggestedWineList from './components/SuggestedWineList/SuggestedWineList';
import { suggestedWinesMockData } from '@/mocks/suggestedWinesMockData';
import WineList from './components/WineList/WineList';
import TextInput from '@/components/Input/TextInput';
import WineFilter from './components/WineFilter/WineFilter';

const WinesPage = () => {
  return (
    <div>
      <div className="bg-[url(@/assets/images/suggested-wine-background.png)] pt-38.5 pb-15 rounded-b-[88px]">
        <SuggestedWineList wines={suggestedWinesMockData} />
      </div>
      <div className="flex gap-15 max-w-[1145px] mx-auto pt-[55px]">
        <div className="flex-1">
          <WineFilter />
        </div>
        <div className="flex flex-col gap-16 max-w-[801px]">
          <TextInput
            label="검색"
            type="search"
            placeholder="와인을 검색해 보세요"
            isSearch
            hideLabel
          />
          <WineList wines={wineListMockData} />
        </div>
      </div>
    </div>
  );
};

export default WinesPage;