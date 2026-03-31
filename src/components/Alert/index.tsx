import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from "lucide-react";

export type AlertVariant = "default" | "success" | "warning" | "danger" | "info";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  onClose?: () => void;
  icon?: React.ReactNode;
}

const variants = {
  default: "bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800",
  success: "bg-emerald-50/50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20 text-emerald-900 dark:text-emerald-100",
  warning: "bg-amber-50/50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20 text-amber-900 dark:text-amber-100",
  danger: "bg-rose-50/50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20 text-rose-900 dark:text-rose-100",
  info: "bg-blue-50/50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20 text-blue-900 dark:text-blue-100",
};

const icons = {
  default: <Info className="h-5 w-5" />,
  success: <CheckCircle2 className="h-5 w-5" />,
  warning: <AlertTriangle className="h-5 w-5" />,
  danger: <AlertCircle className="h-5 w-5" />,
  info: <Info className="h-5 w-5" />,
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", title, children, onClose, icon, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "relative w-full rounded-[1.5rem] border p-4 flex gap-4 transition-all duration-300",
          variants[variant],
          className
        )}
        {...props}
      >
        <div className="shrink-0 mt-0.5 text-current opacity-80">
          {icon || icons[variant]}
        </div>
        <div className="flex-1 flex flex-col gap-1">
          {title && <h5 className="font-black tracking-tight leading-none">{title}</h5>}
          <div className="text-sm opacity-90 font-medium leading-relaxed">
            {children}
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="shrink-0 rounded-lg p-1 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);
Alert.displayName = "Alert";
