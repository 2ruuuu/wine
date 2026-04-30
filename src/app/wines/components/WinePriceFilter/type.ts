export type WinePriceFilterProps = {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  step?: number;
};