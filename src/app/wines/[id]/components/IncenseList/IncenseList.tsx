import {
  Apple,
  Cherry,
  Chocolate,
  Citrus,
  Flower,
  Berry,
  Grass,
  Tobacco,
  NoImage,
  Oak,
  Peach,
  Soil,
  Mineral,
  Baking,
  Tropical,
  Vanilla,
  Pepper,
  Leather,
  Spice,
  Caramel,
} from '@/constants/images';
import Mock from '@/mocks/wineDetail.json';
import IncenseCard from '../IncenseCard/IncenseCard';

const AROMA_PNG: Record<string, any> = {
  CHERRY: Cherry,
  BERRY: Berry,
  OAK: Oak,
  VANILLA: Vanilla,
  PEPPER: Pepper,
  BAKING: Baking,
  GRASS: Grass,
  APPLE: Apple,
  PEACH: Peach,
  CITRUS: Citrus,
  TROPICAL: Tropical,
  MINERAL: Mineral,
  FLOWER: Flower,
  TOBACCO: Tobacco,
  EARTH: Soil,
  CHOCOLATE: Chocolate,
  SPICE: Spice,
  CARAMEL: Caramel,
  LEATHER: Leather,
  noImage: NoImage,
};

const IncenseList = () => {
  const validAromas = Object.entries(Mock.aromaStats)
    .filter(([_, value]) => value > 0)
    .sort((a, b) => b[1] - a[1]);

  const displayAromas = validAromas.slice(0, 4);
  while (displayAromas.length < 4) {
    displayAromas.push(['noImage', 0]);
  }

  return (
    <div className="flex justify-end gap-[16px]">
      {displayAromas.map(([name, count], index) => (
        <IncenseCard
          key={`${name}-${index}`}
          name={name}
          icon={AROMA_PNG[name]}
        />
      ))}
    </div>
  );
};

export default IncenseList;
