import { cva } from "class-variance-authority";

export const inputVariants = cva(
  "flex w-full rounded-xl border bg-white px-4 py-2 text-sm ring-offset-white transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400",
  {
    variants: {
      variant: {
        outline: "border-gray-200 hover:border-gray-300 focus-visible:ring-indigo-500 dark:border-zinc-800 dark:hover:border-zinc-700 dark:focus-visible:ring-indigo-400",
        filled: "border-transparent bg-gray-100 hover:bg-gray-200/80 focus-visible:bg-white focus-visible:ring-indigo-500 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 dark:focus-visible:bg-zinc-950 dark:focus-visible:ring-indigo-400",
        ghost: "border-transparent bg-transparent hover:bg-gray-100 focus-visible:ring-indigo-500 dark:hover:bg-zinc-800 dark:focus-visible:ring-indigo-400",
      },
      size: {
        sm: "h-9 px-3 text-xs rounded-lg",
        default: "h-11 px-4 text-sm",
        lg: "h-13 px-5 text-base rounded-2xl",
      },
      status: {
        default: "",
        error: "border-rose-500 text-rose-600 focus-visible:ring-rose-500 dark:border-rose-500 dark:text-rose-400 dark:focus-visible:ring-rose-500/50",
        warning: "border-amber-500 text-amber-600 focus-visible:ring-amber-500 dark:border-amber-500 dark:text-amber-400 dark:focus-visible:ring-amber-500/50",
        success: "border-emerald-500 text-emerald-600 focus-visible:ring-emerald-500 dark:border-emerald-500 dark:text-emerald-400 dark:focus-visible:ring-emerald-500/50",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
      status: "default",
    },
  }
);
