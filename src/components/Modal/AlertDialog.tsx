/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

import { ModalContext, useModalContext } from './context';

export const AlertDialog = ({ children, ...props }: AlertDialogPrimitive.AlertDialogProps) => (
  <AlertDialogPrimitive.Root {...props}>
    <ModalContext.Provider value={{ open: !!props.open }}>
      {children}
    </ModalContext.Provider>
  </AlertDialogPrimitive.Root>
);

export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

export interface AlertDialogContentProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeVariants = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
};

export const AlertDialogContent = ({
  children,
  size = 'sm',
  className,
}: AlertDialogContentProps) => {
  const { open } = useModalContext();

  return (
    <AlertDialogPrimitive.Portal forceMount>
      <AnimatePresence>
        {open && (
          <AlertDialogPrimitive.Overlay key="overlay" asChild forceMount><motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/40 dark:bg-black/60 backdrop-blur-sm"
            /></AlertDialogPrimitive.Overlay>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <AlertDialogPrimitive.Content key="content" asChild forceMount><div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className={cn(
                  "relative w-full bg-white dark:bg-zinc-900 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden flex flex-col",
                  sizeVariants[size],
                  className
                )}
              >
                {children}
              </motion.div>
            </div></AlertDialogPrimitive.Content>
        )}
      </AnimatePresence>
    </AlertDialogPrimitive.Portal>
  );
};

export const AlertDialogHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("px-6 py-6 text-center sm:text-left", className)}>
    {children}
  </div>
);

export const AlertDialogTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <AlertDialogPrimitive.Title className={cn("text-xl font-bold text-gray-900 dark:text-zinc-50 tracking-tight", className)}>
    {children}
  </AlertDialogPrimitive.Title>
);

export const AlertDialogDescription = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <AlertDialogPrimitive.Description className={cn("text-sm text-gray-500 dark:text-zinc-400 mt-2 font-medium leading-relaxed", className)}>
    {children}
  </AlertDialogPrimitive.Description>
);

export const AlertDialogFooter = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn(
    "px-6 py-4 bg-gray-50/50 dark:bg-zinc-800/20 border-t border-gray-100 dark:border-zinc-800 flex flex-col-reverse sm:flex-row items-center justify-end gap-3",
    className
  )}>
    {children}
  </div>
);

export const AlertDialogAction = ({ children, asChild, ...props }: { children: React.ReactNode; asChild?: boolean; className?: string; onClick?: (e: React.MouseEvent) => void }) => (
  <AlertDialogPrimitive.Action asChild={asChild} {...props}>
    {children}
  </AlertDialogPrimitive.Action>
);

export const AlertDialogCancel = ({ children, asChild, ...props }: { children: React.ReactNode; asChild?: boolean; className?: string }) => (
  <AlertDialogPrimitive.Cancel asChild={asChild} {...props}>
    {children}
  </AlertDialogPrimitive.Cancel>
);

// Composition
export const Alert = Object.assign(AlertDialog, {
  Trigger: AlertDialogTrigger,
  Content: AlertDialogContent,
  Header: AlertDialogHeader,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Footer: AlertDialogFooter,
  Action: AlertDialogAction,
  Cancel: AlertDialogCancel,
});
