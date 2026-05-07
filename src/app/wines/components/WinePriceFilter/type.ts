export type WinePriceFilterProps = {
  minValue: number;
  maxValue: number;
  onChangeMin: (value: number) => void;
  onChangeMax: (value: number) => void;
  max?: number;
  step?: number;
};