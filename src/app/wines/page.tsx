import SuggestedWineList from './components/SuggestedWineList/SuggestedWineList';
import WinesResultsSection from './components/WinesResultsSection/WinesResultsSection';

const WinesPage = () => {
  return (
    <div className="mb-21">
      <div className="bg-[url(@/assets/images/suggested-wine-background.png)] pt-[35px] md:pt-[77px] xl:pt-[104px] pb-7 md:pb-11 xl:pb-15 xl:rounded-b-[88px]">
        <SuggestedWineList />
      </div>
      <WinesResultsSection />
    </div>
  );
};

export default WinesPage;