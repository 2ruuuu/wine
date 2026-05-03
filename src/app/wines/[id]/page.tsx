import Flavor from './components/Flavor/Flavor';
import Incense from './components/Incense/Incense';
import RatingCard from './components/RatingCard/RatingCard';
import ReviewCardList from './components/ReviewCardList.tsx/ReviewCardList';

const Wine = () => {
  return (
    <div>
      <div className="bg-[#D9D9D9] h-[520px]"></div>
      <div className="container-layout">
        <div className="flex gap-[130px]">
          <Flavor />
          <Incense />
        </div>
        <hr className="my-20 border-gray-300" />
        <div className="flex gap-12 justify-between">
          <ReviewCardList />
          <RatingCard />
        </div>
      </div>
    </div>
  );
};

export default Wine;
