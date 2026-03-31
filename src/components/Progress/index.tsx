import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number;
  color?: "default" | "primary" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, color = "primary", size = "md", showValue = false, ...props }, ref) => {
  const colors = {
    default: "bg-gray-900 dark:bg-zinc-100",
    primary: "bg-indigo-600 shadow-lg shadow-indigo-500/20",
    success: "bg-emerald-500 shadow-lg shadow-emerald-500/20",
    warning: "bg-amber-500 shadow-lg shadow-amber-500/20",
    danger: "bg-rose-500 shadow-lg shadow-rose-500/20",
  };

  const sizes = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {showValue && (
        <div className="flex justify-between text-xs font-black tracking-widest uppercase text-gray-400 dark:text-zinc-500">
          <span>Progress</span>
          <span className="text-gray-900 dark:text-zinc-50">{Math.round(value || 0)}%</span>
        </div>
      )}
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-gray-100 dark:bg-zinc-800",
          sizes[size],
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full w-full flex-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            colors[color]
          )}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </ProgressPrimitive.Root>
    </div>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
