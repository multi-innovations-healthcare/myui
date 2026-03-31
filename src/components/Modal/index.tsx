/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import {
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter
} from './parts';
import { ModalContext, useModalContext } from './context';

export interface ModalProps extends Dialog.DialogProps {
  children: React.ReactNode;
  isOpen?: boolean; // Backward compatibility
  onClose?: () => void; // Backward compatibility
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  initialFocus?: React.RefObject<HTMLElement | null>;
  keepMounted?: boolean;
}

const ModalRoot = ({
  children,
  isOpen,
  onClose,
  open: propsOpen,
  defaultOpen,
  onOpenChange: propsOnOpenChange,
  ...props
}: ModalProps) => {
  const isControlled = (propsOpen !== undefined || isOpen !== undefined);
  const controlledOpen = propsOpen ?? isOpen;
  
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen || false);
  const open = isControlled ? controlledOpen : internalOpen;

  const onOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    propsOnOpenChange?.(newOpen);
    if (!newOpen) onClose?.();
  };

  return (
    <Dialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange} {...props}>
      <ModalContext.Provider value={{ open: !!open }}>
        {children}
      </ModalContext.Provider>
    </Dialog.Root>
  );
};

export const ModalTrigger = ({ children, asChild, ...props }: { children: React.ReactNode; asChild?: boolean; className?: string }) => (
  <Dialog.Trigger asChild={asChild} {...props}>
    {children}
  </Dialog.Trigger>
);

export interface ModalContentProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';
  centered?: boolean;
  className?: string;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  initialFocus?: React.RefObject<HTMLElement | null>;
  forceMount?: boolean;
}

const sizeVariants = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  fullscreen: 'max-w-[calc(100vw-2rem)] h-[calc(100vh-2rem)]',
};

export const ModalContent = ({
  children,
  size = 'md',
  centered = true,
  className,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  initialFocus,
}: ModalContentProps) => {
  const { open } = useModalContext();

  return (
    <Dialog.Portal forceMount>
      <AnimatePresence>
        {open && (
          <Dialog.Overlay key="overlay" asChild forceMount><motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/40 dark:bg-black/60 backdrop-blur-sm"
            /></Dialog.Overlay>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <Dialog.Content
            key="content"
            asChild
            forceMount
            onPointerDownOutside={(e) => !closeOnOverlayClick && e.preventDefault()}
            onEscapeKeyDown={(e) => !closeOnEsc && e.preventDefault()}
            onOpenAutoFocus={(e) => {
              if (initialFocus?.current) {
                e.preventDefault();
                initialFocus.current.focus();
              }
            }}
          ><div className={cn(
              "fixed inset-0 z-[101] flex p-4 pointer-events-none",
              centered ? "items-center justify-center" : "items-start justify-center pt-20",
              className
            )}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className={cn(
                  "relative w-full bg-white dark:bg-zinc-900 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden pointer-events-auto flex flex-col",
                  sizeVariants[size]
                )}
              >
                {children}
                <Dialog.Close asChild><button
                    className="absolute right-4 top-4 p-2 rounded-xl text-gray-400 hover:text-gray-900 dark:hover:text-zinc-50 hover:bg-black/5 dark:hover:bg-white/5 transition-all outline-none"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button></Dialog.Close>
              </motion.div>
            </div></Dialog.Content>
        )}
      </AnimatePresence>
    </Dialog.Portal>
  );
};

export { ModalHeader, ModalTitle, ModalDescription, ModalBody, ModalFooter };

// Legacy/Shortcut Export
export interface ModalShortcutProps extends ModalProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';
  centered?: boolean;
}

export const Modal = Object.assign(ModalRoot, {
  Trigger: ModalTrigger,
  Content: ModalContent,
  Header: ModalHeader,
  Title: ModalTitle,
  Description: ModalDescription,
  Body: ModalBody,
  Footer: ModalFooter,
});

// For backward compatibility and simple usage
export const ModalLegacy = ({
  isOpen,
  onClose,
  children,
  size,
  centered,
  ...props
}: ModalShortcutProps) => (
  <Modal open={isOpen} onOpenChange={(open) => !open && onClose?.()} {...props}>
    <ModalContent size={size} centered={centered}>
      {children}
    </ModalContent>
  </Modal>
);

export * from './Drawer';
export * from './AlertDialog';
