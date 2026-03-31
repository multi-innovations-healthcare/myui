import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Check, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const checkboxVariants = cva(
  "peer h-5 w-5 shrink-0 rounded-md border border-gray-300 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:ring-offset-zinc-950 dark:focus-visible:ring-indigo-400",
  {
    variants: {
      state: {
        unchecked: "bg-white dark:bg-zinc-950 hover:border-gray-400 dark:hover:border-zinc-600",
        checked: "bg-indigo-600 border-indigo-600 text-white dark:bg-indigo-500 dark:border-indigo-500",
        indeterminate: "bg-indigo-600 border-indigo-600 text-white dark:bg-indigo-500 dark:border-indigo-500",
      },
    },
    defaultVariants: {
      state: "unchecked",
    },
  }
);

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "checked" | "defaultChecked"> {
  checked?: boolean | "indeterminate";
  defaultChecked?: boolean | "indeterminate";
  onChange?: (checked: boolean | "indeterminate") => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, defaultChecked, onChange, label, description, error, disabled, ...props }, ref) => {
    const [internalChecked, setInternalChecked] = React.useState<boolean | "indeterminate">(
      checked !== undefined ? checked : defaultChecked !== undefined ? defaultChecked : false
    );

    React.useEffect(() => {
      if (checked !== undefined) {
        setInternalChecked(checked);
      }
    }, [checked]);

    const handleChange = () => {
      if (disabled) return;
      const nextState = internalChecked === "indeterminate" ? true : !internalChecked;
      if (checked === undefined) {
        setInternalChecked(nextState);
      }
      onChange?.(nextState);
    };

    const currentState = internalChecked === "indeterminate"
      ? "indeterminate"
      : internalChecked
        ? "checked"
        : "unchecked";

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        <label
          className={cn(
            "flex items-start gap-3 group cursor-pointer select-none",
            disabled && "cursor-not-allowed opacity-60"
          )}
        >
          <div className="relative flex h-5 w-5 items-center justify-center mt-0.5">
            {/* Hidden Native Input */}
            <input
              type="checkbox"
              className="sr-only peer"
              ref={ref}
              checked={internalChecked === true}
              disabled={disabled}
              onChange={handleChange}
              {...props}
            />

            {/* Custom Checkbox Box */}
            <div
              className={cn(
                checkboxVariants({ state: currentState }),
                "flex items-center justify-center"
              )}
            >
              <AnimatePresence mode="wait">
                {/* Checked State */}
                {internalChecked === true && (
                  <motion.div
                    key="check"
                    initial={{ scale: 0.6, opacity: 0, rotate: -12 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.6, opacity: 0, rotate: 12 }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <Check className="h-4 w-4 stroke-[3.5px]" />
                  </motion.div>
                )}

                {/* Indeterminate State */}
                {internalChecked === "indeterminate" && (
                  <motion.div
                    key="minus"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <Minus className="h-3.5 w-3.5 stroke-[4px]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Label + Description */}
          {(label || description) && (
            <div className="flex flex-col pt-0.5">
              {label && (
                <span
                  className={cn(
                    "text-sm font-medium leading-tight transition-colors",
                    internalChecked ? "text-gray-900 dark:text-zinc-100" : "text-gray-700 dark:text-zinc-300",
                    disabled && "opacity-50"
                  )}
                >
                  {label}
                </span>
              )}
              {description && (
                <span className="text-xs text-gray-500 dark:text-zinc-500 leading-normal mt-0.5">
                  {description}
                </span>
              )}
            </div>
          )}
        </label>

        {error && (
          <span className="text-xs text-rose-500 font-medium ml-8">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };