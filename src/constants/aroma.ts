import {
  Cherry,
  Berry,
  Oak,
  Vanilla,
  Pepper,
  Baking,
  Grass,
  Apple,
  Peach,
  Citrus,
  Tropical,
  Mineral,
  Flower,
  Tobacco,
  Soil,
  Chocolate,
  Spice,
  Caramel,
  Leather,
} from './icons';

export const AROMA_DATA = {
  CHERRY: {
    label: '체리',
    icon: Cherry,
  },
  BERRY: {
    label: '베리',
    icon: Berry,
  },
  OAK: {
    label: '오크',
    icon: Oak,
  },
  VANILLA: {
    label: '바닐라',
    icon: Vanilla,
  },
  PEPPER: {
    label: '후추',
    icon: Pepper,
  },
  BAKING: {
    label: '베이킹',
    icon: Baking,
  },
  GRASS: {
    label: '풀',
    icon: Grass,
  },
  APPLE: {
    label: '사과',
    icon: Apple,
  },
  PEACH: {
    label: '복숭아',
    icon: Peach,
  },
  CITRUS: {
    label: '시트러스',
    icon: Citrus,
  },
  TROPICAL: {
    label: '열대과일',
    icon: Tropical,
  },
  MINERAL: {
    label: '미네랄',
    icon: Mineral,
  },
  FLOWER: {
    label: '꽃',
    icon: Flower,
  },
  TOBACCO: {
    label: '담배',
    icon: Tobacco,
  },
  EARTH: {
    label: '흙',
    icon: Soil,
  },
  CHOCOLATE: {
    label: '초콜릿',
    icon: Chocolate,
  },
  SPICE: {
    label: '스파이스',
    icon: Spice,
  },
  CARAMEL: {
    label: '카라멜',
    icon: Caramel,
  },
  LEATHER: {
    label: '가죽',
    icon: Leather,
  },
} as const;

export type AromaKey = keyof typeof AROMA_DATA;
