import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

/* ─── Root (controlled / uncontrolled) ─── */
const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverAnchor = PopoverPrimitive.Anchor;
const PopoverClose = PopoverPrimitive.Close;

/* ─── Content ─── */
export interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  showArrow?: boolean;
}

const PopoverContent = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(
  (
    {
      className,
      align = "center",
      side = "bottom",
      sideOffset = 8,
      showArrow = false,
      children,
      ...props
    },
    ref
  ) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        side={side}
        sideOffset={sideOffset}
        collisionPadding={8}
        className={cn(
          // base
          "z-[200] rounded-xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl shadow-black/8 dark:shadow-black/30",
          "p-4 min-w-[220px] outline-none",
          // animations
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
          "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
          className
        )}
        {...props}
      >
        {children}
        {showArrow && (
          <PopoverPrimitive.Arrow
            className="fill-white dark:fill-zinc-900 drop-shadow-sm"
            width={12}
            height={6}
          />
        )}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
);
PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor, PopoverClose };
