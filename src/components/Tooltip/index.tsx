import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const TooltipRoot = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-[300] overflow-hidden rounded-xl border border-gray-100 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-3 py-1.5 text-xs font-bold text-gray-900 dark:text-zinc-50 shadow-xl animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

/**
 * Simplified Tooltip component for easy usage
 */
interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  delayDuration?: number;
  className?: string;
}

const Tooltip = ({ 
  children, 
  content, 
  side = "top", 
  align = "center",
  delayDuration = 200,
  className 
}: TooltipProps) => {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <TooltipRoot>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent side={side} align={align} className={className}>
          {content}
          <TooltipPrimitive.Arrow className="fill-white dark:fill-zinc-900" />
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  );
};

export { 
  Tooltip, 
  TooltipRoot, 
  TooltipTrigger, 
  TooltipContent, 
  TooltipProvider 
};
