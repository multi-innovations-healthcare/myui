/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { toast as sonnerToast } from 'sonner';

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  onClose: (id: string) => void;
}

export const useToast = () => {
  const toast = React.useCallback(({ title, description, variant = 'default', duration = 4000 }: Omit<ToastProps, 'id' | 'onClose'>) => {
    const options = {
      description,
      duration,
    };

    switch (variant) {
      case 'success':
        sonnerToast.success(title, options);
        break;
      case 'error':
        sonnerToast.error(title, options);
        break;
      case 'warning':
        sonnerToast.warning(title, options);
        break;
      case 'info':
        sonnerToast.info(title, options);
        break;
      default:
        sonnerToast(title, options);
        break;
    }
  }, []);

  return { toast };
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
