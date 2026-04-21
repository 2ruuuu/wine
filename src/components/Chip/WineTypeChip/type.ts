import type { StaticImageData } from "next/image";
import { wineTypeRedImage, wineTypeWhiteImage, wineTypeSparklingImage } from "@/constants/images";

export enum WineType {
  Red = "Red",
  White = "White",
  Sparkling = "Sparkling",
}

export const WINE_TYPE_OPTIONS = [
  WineType.Red,
  WineType.White,
  WineType.Sparkling,
] as const;

export const WINE_TYPE_LABEL: Record<WineType, string> = {
  [WineType.Red]: "Red",
  [WineType.White]: "White",
  [WineType.Sparkling]: "Sparkling",
};

export const WINE_TYPE_IMAGE: Record<WineType, StaticImageData> = {
  [WineType.Red]: wineTypeRedImage,
  [WineType.White]: wineTypeWhiteImage,
  [WineType.Sparkling]: wineTypeSparklingImage,
};

export type WineTypeChipProps = {
  id: string;
  wineType: WineType;
  selectedValue: WineType | null;
  onChange: (value: WineType) => void;
};

export type WineTypeChipDirection = "row" | "column";

export type WineTypeChipGroupProps = {
  selectedValue: WineType | null;
  onChange: (value: WineType) => void;
  direction: WineTypeChipDirection;
  showErrorMessage: boolean;
  errorMessage?: string;
};