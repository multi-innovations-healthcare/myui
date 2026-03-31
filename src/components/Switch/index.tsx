import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

const switchVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-indigo-400",
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        default: "h-6 w-11",
        lg: "h-7 w-[3.25rem]",
      },
      state: {
        unchecked: "bg-gray-200 dark:bg-zinc-800",
        checked: "bg-indigo-600 dark:bg-indigo-500",
      },
    },
    defaultVariants: {
      size: "default",
      state: "unchecked",
    },
  }
);

const thumbVariants = cva(
  "pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 dark:bg-zinc-100",
  {
    variants: {
      size: {
        sm: "h-3.5 w-3.5",
        default: "h-4.5 w-4.5",
        lg: "h-5.5 w-5.5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange">,
    VariantProps<typeof switchVariants> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, size, checked, defaultChecked, onChange, label, description, disabled, ...props }, ref) => {
    const [internalChecked, setInternalChecked] = React.useState<boolean>(
      checked !== undefined ? checked : defaultChecked || false
    );

    React.useEffect(() => {
      if (checked !== undefined) {
        setInternalChecked(checked);
      }
    }, [checked]);

    const handleToggle = () => {
      if (disabled) return;
      const nextState = !internalChecked;
      if (checked === undefined) {
        setInternalChecked(nextState);
      }
      onChange?.(nextState);
    };

    const currentState = internalChecked ? "checked" : "unchecked";

    const thumbPadding = size === "sm" ? 3 : size === "lg" ? 4 : 4;
    const thumbTravel = size === "sm" ? 16 : size === "lg" ? 22 : 20;

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        <label className={cn(
          "flex items-center gap-3 group cursor-pointer",
          disabled && "cursor-not-allowed"
        )}>
          <div className="relative inline-flex items-center">
            <input
              type="checkbox"
              className="sr-only"
              ref={ref}
              checked={internalChecked}
              disabled={disabled}
              onChange={handleToggle}
              {...props}
            />
            <div className={cn(switchVariants({ size, state: currentState }))}>
              <motion.span
                className={cn(thumbVariants({ size }))}
                initial={false}
                animate={{
                  x: internalChecked ? thumbTravel : thumbPadding,
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
                style={{
                    position: 'absolute',
                    left: 0
                }}
              />
            </div>
          </div>
          {(label || description) && (
            <div className="flex flex-col select-none">
              {label && (
                <span className={cn(
                  "text-sm font-medium leading-tight transition-colors",
                  internalChecked ? "text-gray-900 dark:text-zinc-50" : "text-gray-600 dark:text-zinc-400",
                  disabled && "opacity-50"
                )}>
                  {label}
                </span>
              )}
              {description && (
                <span className={cn(
                  "text-xs text-gray-500 dark:text-zinc-500 leading-normal mt-0.5",
                  disabled && "opacity-50"
                )}>
                  {description}
                </span>
              )}
            </div>
          )}
        </label>
      </div>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };
