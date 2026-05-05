import { WineCardProps } from '@/app/wines/components/WineCard/type';
import { WineFilterProps } from '@/app/wines/components/WineFilter/type';

export type WinesResultsSectionProps = {
  wines: WineCardProps[];
};

export type WinesDesktopLayoutProps = WineFilterProps & {
  search: string;
  onSearchChange: (value: string) => void;
  filteredWines: WineCardProps[];
};

export type WinesMobileLayoutProps = {
  search: string;
  onSearchChange: (value: string) => void;
  filteredWines: WineCardProps[];
  isFilterOpen: boolean;
  onOpenFilter: () => void;
  onCloseFilter: () => void;
};