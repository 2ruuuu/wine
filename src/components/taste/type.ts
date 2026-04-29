export type TasteVariant =
  | 'label-boxed-long'
  | 'label-boxed-middle'
  | 'label-boxed-short'
  | 'label-bold'
  | 'label-top';

export type TasteDataKey =
  | 'lightBold'
  | 'smoothTannic'
  | 'drySweet'
  | 'softAcidic';

export interface TasteProps {
  variant: TasteVariant;
  type: TasteDataKey;
  value: number;
}

export interface TasteButtonProps {
  type: TasteDataKey;
  initialValue?: number;
  label: string;
  min: string;
  max: string;
  onChange?: (value: number) => void;
}
