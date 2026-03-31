import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '../../lib/utils';

export const ModalHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("px-6 py-5 border-b border-gray-100 dark:border-zinc-800", className)}>
    {children}
  </div>
);

export const ModalTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <Dialog.Title className={cn("text-xl font-bold text-gray-900 dark:text-zinc-50 tracking-tight", className)}>
    {children}
  </Dialog.Title>
);

export const ModalDescription = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <Dialog.Description className={cn("text-sm text-gray-500 dark:text-zinc-400 mt-1 font-medium", className)}>
    {children}
  </Dialog.Description>
);

export const ModalBody = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("px-6 py-6 overflow-y-auto flex-1", className)}>
    {children}
  </div>
);

export const ModalFooter = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn(
    "px-6 py-4 bg-gray-50/50 dark:bg-zinc-800/20 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-end gap-3",
    className
  )}>
    {children}
  </div>
);
