import {
  WINE_TYPE_IMAGE,
  WINE_TYPE_LABEL,
  WINE_TYPE_OPTIONS,
} from '@/constants/chips';

import Chip from '@/components/Chip/Chip';

import { WineTypeFilterProps } from './type';

const WineTypeFilter = ({
  selectedWineTypes,
  onToggleWineType,
}: WineTypeFilterProps) => {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-lg font-bold">타입</h3>
      <div className="flex flex-col items-start gap-2">
        {WINE_TYPE_OPTIONS.map((wineType) => (
          <Chip
            key={wineType}
            id={`wine-type-${wineType.toLowerCase()}`}
            name="wineType"
            value={wineType}
            checked={selectedWineTypes.includes(wineType)}
            onChange={() => onToggleWineType(wineType)}
            image={{
              src: WINE_TYPE_IMAGE[wineType],
              alt: WINE_TYPE_LABEL[wineType],
              width: 16,
              height: 16,
            }}
          >
            <span>{WINE_TYPE_LABEL[wineType]}</span>
          </Chip>
        ))}
      </div>
    </div>
  );
};

export default WineTypeFilter;
