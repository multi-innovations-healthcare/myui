import * as React from "react";
import { cn } from "@/lib/utils";

export type FormProps = React.FormHTMLAttributes<HTMLFormElement>;

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, ...props }, ref) => (
    <form
      ref={ref}
      className={cn("space-y-6", className)}
      {...props}
    />
  )
);
Form.displayName = "Form";

/**
 * FormItem component for individual form fields with labels and error messages
 */
export interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
}

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, label, description, error, required, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-col gap-2 w-full", className)} {...props}>
        {label && (
          <label className="text-xs font-black tracking-widest uppercase text-gray-500 dark:text-zinc-400 px-1">
            {label}
            {required && <span className="text-rose-500 ml-1">*</span>}
          </label>
        )}
        {children}
        {description && (
          <p className="text-[11px] text-gray-400 dark:text-zinc-500 px-1 leading-relaxed">
            {description}
          </p>
        )}
        {error && (
          <p className="text-[11px] text-rose-500 font-bold px-1 animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);
FormItem.displayName = "FormItem";

export { Form, FormItem };
