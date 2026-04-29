import type { StaticImageData } from "next/image";
import { wineTypeRedImage, wineTypeWhiteImage, wineTypeSparklingImage } from "@/constants/images";

// 와인 타입 칩에 사용되는 옵션
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

// 와인 향 칩에 사용되는 옵션
export enum WineFlavor {
  Cherry = "Cherry",
  Berry = "Berry",
  Oak = "Oak",
  Vanilla = "Vanilla",
  Pepper = "Pepper",
  Baking = "Baking",
  Grass = "Grass",
  Apple = "Apple",
  Peach = "Peach",
  Citrus = "Citrus",
  Tropical = "Tropical",
  Mineral = "Mineral",
  Floral = "Floral",
  Tobacco = "Tobacco",
  Earthy = "Earthy",
  Chocolate = "Chocolate",
  Spice = "Spice",
  Caramel = "Caramel",
  Leather = "Leather",
}

export const WINE_FLAVOR_OPTIONS = [
  WineFlavor.Cherry,
  WineFlavor.Berry,
  WineFlavor.Oak,
  WineFlavor.Vanilla,
  WineFlavor.Pepper,
  WineFlavor.Baking,
  WineFlavor.Grass,
  WineFlavor.Apple,
  WineFlavor.Peach,
  WineFlavor.Citrus,
  WineFlavor.Tropical,
  WineFlavor.Mineral,
  WineFlavor.Floral,
  WineFlavor.Tobacco,
  WineFlavor.Earthy,
  WineFlavor.Chocolate,
  WineFlavor.Spice,
  WineFlavor.Caramel,
  WineFlavor.Leather,
] as const;

export const WINE_FLAVOR_LABEL: Record<WineFlavor, string> = {
  [WineFlavor.Cherry]: "체리",
  [WineFlavor.Berry]: "베리",
  [WineFlavor.Oak]: "오크",
  [WineFlavor.Vanilla]: "바닐라",
  [WineFlavor.Pepper]: "후추",
  [WineFlavor.Baking]: "제빵",
  [WineFlavor.Grass]: "풀",
  [WineFlavor.Apple]: "사과",
  [WineFlavor.Peach]: "복숭아",
  [WineFlavor.Citrus]: "시트러스",
  [WineFlavor.Tropical]: "트로피컬",
  [WineFlavor.Mineral]: "미네랄",
  [WineFlavor.Floral]: "꽃",
  [WineFlavor.Tobacco]: "담뱃잎",
  [WineFlavor.Earthy]: "흙",
  [WineFlavor.Chocolate]: "초콜릿",
  [WineFlavor.Spice]: "스파이스",
  [WineFlavor.Caramel]: "카라멜",
  [WineFlavor.Leather]: "가죽",
};