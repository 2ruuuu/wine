import type { ReactNode } from 'react';

export type DropdownVariant =
  | 'basic'
  | 'small';

export type DropdownChildrenProps = {
  toggle: () => void;
};

export type DropdownOption = {
  label: string;
  onSelect: () => void;
};

export type DropdownProps = {
  variant: DropdownVariant;
  options: DropdownOption[];
  children: (props: DropdownChildrenProps) => ReactNode;
};