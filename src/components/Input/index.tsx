import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Eye, EyeOff, XCircle, Loader2 } from "lucide-react";
import { inputVariants } from "./variants";


export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix">,
    VariantProps<typeof inputVariants> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  allowClear?: boolean;
  onClear?: () => void;
  showCount?: boolean;
  maxLength?: number;
  loading?: boolean;
  classNames?: {
    container?: string;
    input?: string;
    prefix?: string;
    suffix?: string;
    clearIcon?: string;
    count?: string;
  };
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      status,
      type,
      prefix,
      suffix,
      allowClear,
      onClear,
      showCount,
      maxLength,
      loading,
      classNames,
      value,
      onChange,
      defaultValue,
      disabled,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue || "");
    const isControlled = value !== undefined;
    const inputValue = isControlled ? value : uncontrolledValue;

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isControlled) {
        setUncontrolledValue("");
      }
      if (onChange) {
        const event = {
          target: { ...e.target, value: "" },
          currentTarget: { ...e.currentTarget, value: "" },
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
      onClear?.();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setUncontrolledValue(e.target.value);
      }
      onChange?.(e);
    };

    const isPassword = type === "password";
    const actualType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div
        className={cn(
          "relative group flex items-center transition-all duration-200",
          inputVariants({ variant, size, status }),
          prefix && "pl-0 overflow-hidden",
          suffix && "pr-0 overflow-hidden",
          loading && "opacity-70 pointer-events-none",
          classNames?.container,
          className
        )}
      >
        {prefix && (
          <div
            className={cn(
              "flex items-center justify-center pl-4 pr-2 text-gray-400 dark:text-zinc-500 transition-colors shrink-0",
              classNames?.prefix
            )}
          >
            {prefix}
          </div>
        )}

        <input
          type={actualType}
          className={cn(
            "flex-1 bg-transparent py-2 focus:outline-none disabled:cursor-not-allowed",
            classNames?.input
          )}
          ref={ref}
          value={inputValue}
          onChange={handleChange}
          maxLength={maxLength}
          disabled={disabled || loading}
          {...props}
        />

        {/* Clear Icon */}
        {allowClear && inputValue && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className={cn(
              "p-1 hover:text-gray-900 dark:hover:text-zinc-50 text-gray-400 dark:text-zinc-500 transition-colors rounded-full shrink-0 mx-1",
              classNames?.clearIcon
            )}
          >
            <XCircle className="h-4 w-4" />
          </button>
        )}

        {/* Password Toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="p-1 hover:text-gray-900 dark:hover:text-zinc-50 text-gray-400 dark:text-zinc-500 transition-colors rounded-full shrink-0 mx-1"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="p-1 text-gray-400 dark:text-zinc-500 shrink-0 mx-1">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}

        {suffix && (
          <div
            className={cn(
              "flex items-center justify-center px-4 text-gray-400 dark:text-zinc-500 transition-colors shrink-0 border-l border-gray-100 dark:border-zinc-800 ml-2 h-full",
              classNames?.suffix
            )}
          >
            {suffix}
          </div>
        )}

        {/* Character Count */}
        {showCount && (
          <div
            className={cn(
              "absolute -bottom-6 right-1 flex items-center gap-1 text-[10px] text-gray-400 dark:text-zinc-500",
              classNames?.count
            )}
          >
            <span className={cn(maxLength && String(inputValue).length >= maxLength && "text-rose-500")}>
              {String(inputValue).length}
            </span>
            {maxLength && <span>/ {maxLength}</span>}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

/**
 * TextArea with Auto-resize
 */
export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof inputVariants> {
  autoSize?: boolean | { minRows?: number; maxRows?: number };
  showCount?: boolean;
  status?: "default" | "error" | "warning" | "success";
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, variant, size, status, autoSize, showCount, maxLength, value, onChange, defaultValue, ...props }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue || "");
    const isControlled = value !== undefined;
    const inputValue = isControlled ? value : uncontrolledValue;
    
    const areaRef = React.useRef<HTMLTextAreaElement | null>(null);
    React.useImperativeHandle(ref, () => areaRef.current as HTMLTextAreaElement);

    const handleResize = React.useCallback(() => {
      if (!autoSize || !areaRef.current) return;
      const element = areaRef.current;
      element.style.height = "auto";
      element.style.height = `${element.scrollHeight}px`;
    }, [autoSize]);

    React.useEffect(() => {
      handleResize();
    }, [inputValue, handleResize]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        setUncontrolledValue(e.target.value);
      }
      onChange?.(e);
    };

    return (
      <div className="relative w-full">
        <textarea
          ref={areaRef}
          value={value !== undefined ? value : inputValue}
          onChange={handleChange}
          maxLength={maxLength}
          className={cn(
            "flex min-h-[80px] w-full rounded-xl border bg-white px-4 py-3 text-sm ring-offset-white transition-all duration-200 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400",
            inputVariants({ variant, status }),
            size === "sm" && "text-xs px-3",
            size === "lg" && "text-base px-5",
            className
          )}
          {...props}
        />
        {showCount && (
          <div className="absolute -bottom-6 right-1 flex items-center gap-1 text-[10px] text-gray-400 dark:text-zinc-500">
            <span className={cn(maxLength && String(inputValue).length >= maxLength && "text-rose-500")}>
              {String(inputValue).length}
            </span>
            {maxLength && <span>/ {maxLength}</span>}
          </div>
        )}
      </div>
    );
  }
);
TextArea.displayName = "TextArea";

export { Input, TextArea };
