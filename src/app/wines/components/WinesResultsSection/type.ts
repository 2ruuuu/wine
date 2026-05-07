import { WineCardProps } from '@/app/wines/components/WineCard/type';
import { WineFilterProps } from '@/app/wines/components/WineFilter/type';

export type WinesDesktopLayoutProps = WineFilterProps & {
  search: string;
  onSearchChange: (value: string) => void;
  filteredWines: WineCardProps[];
  onWineUpdated: () => void;
};

export type WinesMobileLayoutProps = {
  search: string;
  onSearchChange: (value: string) => void;
  filteredWines: WineCardProps[];
  onWineUpdated: () => void;
  isFilterOpen: boolean;
  onOpenFilter: () => void;
  onCloseFilter: () => void;
} & WineFilterProps;