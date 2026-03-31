import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "circle" | "rect" | "text";
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  className,
  variant = "rect",
  width,
  height,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gray-200/60 dark:bg-zinc-800/60",
        variant === "circle" && "rounded-full",
        variant === "rect" && "rounded-xl",
        variant === "text" && "rounded-md h-3 w-full",
        className
      )}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        ...style,
      }}
      {...props}
    />
  );
}
