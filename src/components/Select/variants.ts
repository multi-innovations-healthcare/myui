import { cva } from "class-variance-authority";

export const selectVariants = cva(
  "flex w-full items-center justify-between rounded-xl border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        bordered: "border-gray-200 bg-white hover:border-gray-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700",
        filled: "border-transparent bg-gray-100 hover:bg-gray-200/80 focus-visible:bg-white dark:bg-zinc-800 dark:hover:bg-zinc-700/80 dark:focus-visible:bg-zinc-950",
      },
      size: {
        sm: "min-h-[36px] px-3 text-xs",
        default: "min-h-[44px] px-4 text-sm",
        lg: "min-h-[52px] px-5 text-base rounded-2xl",
      },
      status: {
        default: "focus-visible:ring-indigo-500 dark:focus-visible:ring-indigo-400",
        error: "border-rose-500 text-rose-600 focus-visible:ring-rose-500 dark:border-rose-500 dark:text-rose-400 dark:focus-visible:ring-rose-500/50",
        warning: "border-amber-500 text-amber-600 focus-visible:ring-amber-500 dark:border-amber-500 dark:text-amber-400 dark:focus-visible:ring-amber-500/50",
      },
    },
    defaultVariants: {
      variant: "bordered",
      size: "default",
      status: "default",
    },
  }
);

export const dropdownVariants = cva(
  "absolute z-[100] w-full mt-2 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl shadow-xl transition-all duration-200 origin-top overflow-hidden",
  {
    variants: {
      isOpen: {
        true: "opacity-100 scale-y-100",
        false: "opacity-0 scale-y-95 pointer-events-none",
      },
    },
    defaultVariants: {
      isOpen: false,
    },
  }
);
