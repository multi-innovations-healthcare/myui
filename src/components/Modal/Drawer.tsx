/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
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

export interface DrawerProps extends Dialog.DialogProps {
  children: React.ReactNode;
}

const DrawerRoot = ({ open: propsOpen, defaultOpen, onOpenChange, children, ...props }: DrawerProps) => {
  const isControlled = propsOpen !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen || false);
  const open = isControlled ? propsOpen : internalOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) setInternalOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  return (
    <Dialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={handleOpenChange} {...props}>
      <ModalContext.Provider value={{ open: !!open }}>
        {children}
      </ModalContext.Provider>
    </Dialog.Root>
  );
};

export interface DrawerContentProps {
  children: React.ReactNode;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
}

const placementVariants = {
  left: {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
    className: 'left-0 h-full w-full max-w-sm rounded-r-[2.5rem]',
  },
  right: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
    className: 'right-0 h-full w-full max-w-sm rounded-l-[2.5rem]',
  },
  top: {
    initial: { y: '-100%' },
    animate: { y: 0 },
    exit: { y: '-100%' },
    className: 'top-0 w-full max-h-[80vh] rounded-b-[2.5rem]',
  },
  bottom: {
    initial: { y: '100%' },
    animate: { y: 0 },
    exit: { y: '100%' },
    className: 'bottom-0 w-full max-h-[80vh] rounded-t-[2.5rem]',
  },
};

const sizeVariants = {
  sm: 'max-w-xs',
  md: 'max-w-sm',
  lg: 'max-w-md',
  xl: 'max-w-xl',
};

const DrawerContent = ({
  children,
  placement = 'right',
  size = 'md',
  className,
  closeOnOverlayClick = true,
  closeOnEsc = true,
}: DrawerContentProps) => {
  const variant = placementVariants[placement];
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
          ><motion.div
              initial={variant.initial}
              animate={variant.animate}
              exit={variant.exit}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={cn(
                "fixed z-[101] bg-white dark:bg-zinc-900 shadow-2xl border-gray-100 dark:border-zinc-800 flex flex-col overflow-hidden",
                variant.className,
                (placement === 'left' || placement === 'right') && sizeVariants[size],
                className
              )}
            >
              {children}
              <Dialog.Close asChild><button
                  className="absolute right-4 top-4 p-2 rounded-xl text-gray-400 hover:text-gray-900 dark:hover:text-zinc-50 hover:bg-black/5 dark:hover:bg-white/5 transition-all outline-none"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button></Dialog.Close>
            </motion.div></Dialog.Content>
        )}
      </AnimatePresence>
    </Dialog.Portal>
  );
};

export const DrawerTrigger = ({ children, asChild, ...props }: { children: React.ReactNode; asChild?: boolean; className?: string }) => (
  <Dialog.Trigger asChild={asChild} {...props}>
    {children}
  </Dialog.Trigger>
);

export const Drawer = Object.assign(DrawerRoot, {
  Trigger: DrawerTrigger,
  Content: DrawerContent,
  Header: ModalHeader,
  Title: ModalTitle,
  Description: ModalDescription,
  Body: ModalBody,
  Footer: ModalFooter,
});
