import { ReactNode } from 'react';

export type ModalRootProps = {
  title: string;
  children: ReactNode;
  onClose: () => void;
  hasHead?: boolean;
  className?: string;
};

export type ModalProviderProps =
  | { type: 'filter' }
  | { type: 'register' }
  | { type: 'review'; wineId: number }
  | { type: 'delete' }
  | { type: 'nickname'; name: string; onConfirm?: () => void }
  | null;

export type ModalContextProps = {
  openModal: (modal: Exclude<ModalProviderProps, null>) => void;
  closeModal: () => void;
};

export type NameChangeModalProps = {
  name: string;
  onClose: () => void;
  onConfirm?: () => void;
};
