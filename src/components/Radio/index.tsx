import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

const radioVariants = cva(
  "relative flex aspect-square h-5 w-5 items-center justify-center rounded-full border border-gray-200 bg-white text-indigo-600 transition-all duration-200 outline-none ring-offset-2 ring-offset-white dark:border-zinc-800 dark:bg-zinc-950 dark:text-indigo-500 dark:ring-offset-zinc-950 peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  {
    variants: {
      state: {
        unchecked: "hover:border-gray-300 dark:hover:border-zinc-700",
        checked: "border-indigo-600 dark:border-indigo-500",
      },
    },
    defaultVariants: {
      state: "unchecked",
    },
  }
);

export interface RadioOption {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
  description?: React.ReactNode;
}

export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  options: RadioOption[];
  orientation?: "vertical" | "horizontal";
  disabled?: boolean;
  error?: string;
  label?: React.ReactNode;
  name?: string;
  required?: boolean;
  className?: string;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ value, defaultValue, onValueChange, options, orientation = "vertical", disabled = false, error, label, name, required, className }, ref) => {
    const [selectedValue, setSelectedValue] = React.useState<string>(value || defaultValue || "");
    const generatedName = React.useId();
    const groupName = name || generatedName;

    React.useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);

    const handleSelect = (val: string) => {
      if (disabled) return;
      setSelectedValue(val);
      onValueChange?.(val);
    };

    return (
      <div 
        ref={ref} 
        className={cn("flex flex-col gap-3", className)}
        role="radiogroup"
        aria-required={required}
        aria-invalid={!!error}
        aria-orientation={orientation}
      >
        {label && (
          <span className="text-sm font-semibold text-gray-900 dark:text-zinc-50 mb-1">
            {label}
          </span>
        )}
        <div className={cn(
          "flex gap-y-4 gap-x-8",
          orientation === "vertical" ? "flex-col" : "flex-row flex-wrap"
        )}>
          {options.map((option) => (
            <RadioItem
              key={option.value}
              groupName={groupName}
              checked={selectedValue === option.value}
              disabled={disabled || option.disabled}
              required={required}
              onSelect={() => handleSelect(option.value)}
              {...option}
            />
          ))}
        </div>
        {error && (
          <span className="text-xs text-rose-500 font-medium animate-in fade-in slide-in-from-top-1 duration-200">
            {error}
          </span>
        )}
      </div>
    );
  }
);
RadioGroup.displayName = "RadioGroup";

interface RadioItemProps extends RadioOption {
  checked: boolean;
  disabled?: boolean;
  required?: boolean;
  groupName: string;
  onSelect: () => void;
}

const RadioItem = ({ label, value, checked, disabled, required, description, groupName, onSelect }: RadioItemProps) => {
  const id = React.useId();

  return (
    <label htmlFor={id} className={cn(
      "flex items-start gap-3 group cursor-pointer select-none relative",
      disabled && "cursor-not-allowed opacity-50"
    )}>
      <input
        type="radio"
        id={id}
        name={groupName}
        value={value}
        checked={checked}
        disabled={disabled}
        required={required}
        onChange={onSelect}
        className="peer sr-only"
        aria-describedby={description ? `${id}-description` : undefined}
      />
      <div className="relative flex items-center justify-center mt-0.5 shrink-0">
        <div className={cn(radioVariants({ state: checked ? "checked" : "unchecked" }))}>
          {checked && (
            <motion.div
              layoutId={`radio-center-${groupName}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute inset-0 m-auto h-2.5 w-2.5 rounded-full bg-indigo-600 dark:bg-indigo-500"
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <span className={cn(
          "text-sm font-medium leading-tight transition-colors",
          checked ? "text-gray-900 dark:text-zinc-50" : "text-gray-600 dark:text-zinc-400 group-hover:text-gray-900 dark:group-hover:text-zinc-300"
        )}>
          {label}
        </span>
        {description && (
          <span id={`${id}-description`} className="text-xs text-gray-500 dark:text-zinc-500 leading-normal mt-0.5">
            {description}
          </span>
        )}
      </div>
    </label>
  );
};

export { RadioGroup, RadioItem };
