import * as React from "react";
import { cva } from "class-variance-authority";
import { motion } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const MotionButton = motion.button;
const MotionAnchor = motion.a;

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        solid: "",
        outlined: "border",
        dashed: "border border-dashed",
        filled: "border border-transparent",
        text: "bg-transparent border border-transparent shadow-none",
        link: "bg-transparent border border-transparent shadow-none underline-offset-4 hover:underline",
      },
      color: {
        default: "",
        primary: "",
        danger: "",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        default: "h-10 px-4 py-2",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
      shape: {
        default: "rounded-lg",
        circle: "rounded-full aspect-square p-0",
        round: "rounded-full",
      },
      block: {
        true: "w-full flex",
      },
      ghost: {
        true: "bg-transparent",
      }
    },
    compoundVariants: [
      // Solid
      { variant: "solid", color: "default", className: "bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 shadow-sm" },
      { variant: "solid", color: "primary", className: "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-sm" },
      { variant: "solid", color: "danger", className: "bg-rose-600 text-white hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600 shadow-sm" },

      // Outlined
      { variant: "outlined", color: "default", className: "border-gray-200 bg-white text-gray-900 shadow-sm hover:bg-gray-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900" },
      { variant: "outlined", color: "primary", className: "border-indigo-600 text-indigo-600 bg-transparent hover:bg-indigo-50 dark:border-indigo-500 dark:text-indigo-400 dark:hover:bg-indigo-500/10 shadow-sm" },
      { variant: "outlined", color: "danger", className: "border-rose-600 text-rose-600 bg-transparent hover:bg-rose-50 dark:border-rose-500 dark:text-rose-400 dark:hover:bg-rose-500/10 shadow-sm" },

      // Dashed
      { variant: "dashed", color: "default", className: "border-gray-300 bg-transparent text-gray-900 shadow-sm hover:bg-gray-50 hover:border-indigo-500 hover:text-indigo-600 dark:border-zinc-700 dark:text-zinc-50 dark:hover:border-indigo-400 dark:hover:text-indigo-400 dark:hover:bg-zinc-900" },
      { variant: "dashed", color: "primary", className: "border-indigo-600 text-indigo-600 bg-transparent hover:bg-indigo-50 dark:border-indigo-500 dark:text-indigo-400 dark:hover:bg-indigo-500/10 shadow-sm" },
      { variant: "dashed", color: "danger", className: "border-rose-600 text-rose-600 bg-transparent hover:bg-rose-50 dark:border-rose-500 dark:text-rose-400 dark:hover:bg-rose-500/10 shadow-sm" },

      // Filled
      { variant: "filled", color: "default", className: "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700" },
      { variant: "filled", color: "primary", className: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:bg-indigo-500/20" },
      { variant: "filled", color: "danger", className: "bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20" },

      // Text
      { variant: "text", color: "default", className: "text-gray-700 hover:bg-gray-100 dark:text-zinc-300 dark:hover:bg-zinc-800" },
      { variant: "text", color: "primary", className: "text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-500/10" },
      { variant: "text", color: "danger", className: "text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10" },

      // Link
      { variant: "link", color: "default", className: "text-gray-900 hover:text-gray-700 dark:text-zinc-50 dark:hover:text-zinc-300" },
      { variant: "link", color: "primary", className: "text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300" },
      { variant: "link", color: "danger", className: "text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300" },

      // Ghost
      { ghost: true, className: "bg-transparent shadow-none" },
      { variant: "solid", ghost: true, color: "default", className: "text-gray-900 hover:text-gray-900 hover:bg-gray-100 dark:text-zinc-50 dark:hover:text-zinc-50 dark:hover:bg-zinc-800" },
      { variant: "solid", ghost: true, color: "primary", className: "text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:text-indigo-300 dark:hover:bg-indigo-500/10" },
      { variant: "solid", ghost: true, color: "danger", className: "text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:text-rose-400 dark:hover:text-rose-300 dark:hover:bg-rose-500/10" },
    ],
    defaultVariants: {
      variant: "outlined",
      color: "default",
      size: "default",
      shape: "default",
    },
  }
);

export type ButtonType = "default" | "primary" | "dashed" | "link" | "text";
export type ButtonHTMLType = "submit" | "button" | "reset";
export type ButtonVariant = "solid" | "outlined" | "dashed" | "filled" | "text" | "link";
export type ButtonColor = "default" | "primary" | "danger";

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement>, 'type' | 'color'> {
  asChild?: boolean;
  type?: ButtonType;
  htmlType?: ButtonHTMLType;
  variant?: ButtonVariant;
  color?: ButtonColor;
  danger?: boolean;
  size?: "sm" | "default" | "lg" | "icon";
  shape?: "default" | "circle" | "round";
  block?: boolean;
  ghost?: boolean;
  loading?: boolean | { delay?: number; icon?: React.ReactNode };
  icon?: React.ReactNode;
  iconPlacement?: "start" | "end";
  autoInsertSpace?: boolean;
  href?: string;
  target?: string;
  classNames?: { icon?: string; text?: string; spinner?: string };
  styles?: { icon?: React.CSSProperties; text?: React.CSSProperties; spinner?: React.CSSProperties };
  // Legacy props for backward compatibility
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      className,
      type,
      htmlType = "button",
      variant,
      color,
      danger = false,
      size,
      shape,
      block,
      fullWidth,
      ghost,
      loading = false,
      isLoading = false,
      loadingText,
      icon,
      leftIcon,
      rightIcon,
      iconPlacement = "start",
      autoInsertSpace = true,
      href,
      target,
      asChild = false,
      classNames,
      styles,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    // Resolve variant and color (Default = "outlined")
    let resolvedVariant: ButtonVariant = variant || "outlined";
    let resolvedColor: ButtonColor = color || "default";

    if (!variant && !color && type) {
      if (type === "primary") { resolvedVariant = "solid"; resolvedColor = "primary"; }
      else if (type === "dashed") { resolvedVariant = "dashed"; resolvedColor = "default"; }
      else if (type === "link") { resolvedVariant = "link"; resolvedColor = "primary"; }
      else if (type === "text") { resolvedVariant = "text"; resolvedColor = "default"; }
      else { resolvedVariant = "outlined"; resolvedColor = "default"; }
    }

    if (danger) resolvedColor = "danger";

    // Loading logic
    const [innerLoading, setInnerLoading] = React.useState(false);
    const isLoaderActive = !!loading || isLoading;
    const loadingObj = typeof loading === 'object' ? loading : {};
    const delayMs = loadingObj.delay;
    const customIcon = loadingObj.icon;
 
    React.useEffect(() => {
      let timeoutId: ReturnType<typeof setTimeout>;
      if (delayMs) {
        setInnerLoading(false);
        timeoutId = setTimeout(() => setInnerLoading(true), delayMs);
      } else {
        setInnerLoading(isLoaderActive);
      }
      return () => clearTimeout(timeoutId);
    }, [delayMs, isLoaderActive]);
 
    const spinner = customIcon || <Loader2 className="h-4 w-4" />;

    const disabledAttr = props.disabled || innerLoading;
    const isBlock = block || fullWidth;

    const baseProps: Record<string, unknown> = {
      className: cn(
        buttonVariants({
          variant: resolvedVariant,
          color: resolvedColor,
          size,
          shape,
          block: isBlock,
          ghost,
        }),
        className
      ),
      ref,
      onClick: disabledAttr ? undefined : onClick,
      ...(href ? { href, target } : { type: htmlType, disabled: disabledAttr }),
      ...props,
    };

    if (asChild) {
      return <Slot {...baseProps}>{children}</Slot>;
    }

    // Icon handling (support legacy + new)
    const actualLeftIcon = leftIcon || (icon && iconPlacement === "start" ? icon : null);
    const actualRightIcon = rightIcon || (icon && iconPlacement === "end" ? icon : null);

    const iconNode = innerLoading ? spinner : null;
    const renderLeft = iconNode && iconPlacement === "start" 
      ? <span className={cn("animate-spin shrink-0", classNames?.spinner)} style={styles?.spinner}>{iconNode}</span>
      : actualLeftIcon;

    const renderRight = iconNode && iconPlacement === "end" 
      ? <span className={cn("animate-spin shrink-0", classNames?.spinner)} style={styles?.spinner}>{iconNode}</span>
      : actualRightIcon;

    const hasTwoChars = autoInsertSpace && typeof children === "string" && children.length === 2 && /[\u4e00-\u9fa5]/.test(children);
    const renderChildren = innerLoading && loadingText ? loadingText : (hasTwoChars ? children.split("").join(" ") : children);

    const content = (
      <span className="flex items-center justify-center gap-2">
        {renderLeft && <span className={cn("inline-flex shrink-0", !innerLoading && classNames?.icon)} style={!innerLoading ? styles?.icon : undefined}>{renderLeft}</span>}
        {renderChildren && <span className={cn("inline-flex items-center gap-2", classNames?.text)} style={styles?.text}>{renderChildren}</span>}
        {renderRight && <span className={cn("inline-flex shrink-0", !innerLoading && classNames?.icon)} style={!innerLoading ? styles?.icon : undefined}>{renderRight}</span>}
      </span>
    );
 
    if (href) {
      return (
        <MotionAnchor 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          {...(baseProps as React.ComponentProps<typeof motion.a>)}
        >
          {content}
        </MotionAnchor>
      );
    }

    return (
      <MotionButton 
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        {...(baseProps as React.ComponentProps<typeof motion.button>)}
      >
        {content}
      </MotionButton>
    );
  }
);

Button.displayName = "Button";

export { Button };