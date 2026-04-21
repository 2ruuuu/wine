import WineTypeChip from "./WineTypeChip";
import { WINE_TYPE_OPTIONS } from "./type";
import type { WineTypeChipGroupProps } from "./type";

const WINE_TYPE_ERROR_MESSAGE = "와인 타입은 필수 입력이에요";

const ChipGroup = ({
  selectedValue,
  onChange,
  direction,
  showErrorMessage,
  errorMessage = WINE_TYPE_ERROR_MESSAGE,
}: WineTypeChipGroupProps) => {
  const directionClass = direction === "column" ? "flex-col" : "flex-row";

  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex items-center gap-[8px]">
        <h3 className="text-base font-semibold">타입</h3>
        {showErrorMessage  
          ? <span className="text-xs text-[hsl(var(--error))]">{errorMessage}</span> 
          : null
        }
      </div>
      <div className={`flex ${directionClass} items-start gap-[10px]`}>
        {WINE_TYPE_OPTIONS.map((wineType) => (
          <WineTypeChip
            key={wineType}
            id={`wine-type-${wineType.toLowerCase()}`}
            wineType={wineType}
            selectedValue={selectedValue}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
};

export default ChipGroup;
