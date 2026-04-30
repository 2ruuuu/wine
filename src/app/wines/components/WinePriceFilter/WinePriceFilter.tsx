import { WinePriceFilterProps } from "./type";

const WinePriceFilter = ({
  value,
  onChange,
  max = 500000,
  step = 10000,
}: WinePriceFilterProps) => {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-lg font-bold">가격</h3>
      <div className="flex flex-col gap-[5px]">
        <div className="flex justify-between items-center w-full">
          <span>￦0</span>
          <span>￦{value.toLocaleString()}</span>
        </div>
        <input
          id="wine-price"
          type="range"
          name="price"
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full accent-black"
        />
      </div>
    </div>
  );
};

export default WinePriceFilter;