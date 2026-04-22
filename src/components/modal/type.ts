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
  | { type: 'review' }
  | { type: 'delete' }
  | { type: 'nickname' }
  | null;

export type ModalContextProps = {
  openModal: (modal: Exclude<ModalProviderProps, null>) => void;
  closeModal: () => void;
};
