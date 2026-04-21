import Image from "next/image";
import type { WineTypeChipProps } from "./type";
import { WINE_TYPE_IMAGE, WINE_TYPE_LABEL } from "./type";

const WineTypeChip = ({
  id,
  wineType,
  selectedValue,
  onChange,
}: WineTypeChipProps) => {
  const isSelected = selectedValue === wineType;

  return (
    <label
      htmlFor={id}
      className={`inline-flex cursor-pointer items-center rounded-full gap-[8px] border border-[#F2F2F2] pl-[8px] pr-[16px] py-[8px] text-base font-semibold transition-colors ${
        isSelected
          ? "bg-[hsl(var(--black))] text-[#F2F2F2]"
          : "hover:bg-[hsl(var(--gray-100))] bg-white text-gray-700"
      }`}
    >
      <input
        id={id}
        type="radio"
        name="wineType"
        value={wineType}
        checked={isSelected}
        onChange={() => onChange(wineType)}
        className="sr-only"
      />
      <Image
        src={WINE_TYPE_IMAGE[wineType]}
        alt={`${WINE_TYPE_LABEL[wineType]} wine`}
        width={32}
        height={32}
      />
      <span>{WINE_TYPE_LABEL[wineType]}</span>
    </label>
  );
};

export default WineTypeChip;
