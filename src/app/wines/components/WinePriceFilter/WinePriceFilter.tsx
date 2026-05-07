import { Range, getTrackBackground } from 'react-range';
import { WinePriceFilterProps } from './type';

const WinePriceFilter = ({
  minValue,
  maxValue,
  onChangeMin,
  onChangeMax,
  max = 5000000,
  step = 50000,
}: WinePriceFilterProps) => {
  const values = [
    Math.max(0, minValue),
    Math.min(max, Math.max(minValue, maxValue)),
  ];

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-lg font-bold">가격</h3>
      <div className="flex flex-col gap-[5px]">
        <div className="flex justify-between items-center w-full">
          <span>￦{values[0].toLocaleString()}</span>
          <span>￦{values[1].toLocaleString()}</span>
        </div>
        <Range
          values={values}
          step={step}
          min={0}
          max={max}
          onChange={([nextMin, nextMax]) => {
            onChangeMin(nextMin);
            onChangeMax(nextMax);
          }}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="h-1 w-full rounded-full"
              style={{
                ...props.style,
                background: getTrackBackground({
                  values,
                  colors: ['#E5E5E5', '#111111', '#E5E5E5'],
                  min: 0,
                  max,
                }),
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => {
            const { key, ...thumbProps } = props;

            return (
              <div
                key={key}
                {...thumbProps}
                className="h-4 w-4 rounded-full bg-black shadow focus:outline-none"
              />
            );
          }}
        />
      </div>
    </div>
  );
};

export default WinePriceFilter;
