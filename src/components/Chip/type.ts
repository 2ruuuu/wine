import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";

export type ChipProps = {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  image?: {
    src: StaticImageData;
    alt: string;
    width: number;
    height: number;
  };
  children: ReactNode;
};