import { createContext, useContext } from 'react';

export interface ModalContextValue {
  open: boolean;
}

export const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a Modal or Drawer');
  }
  return context;
};
