import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-full",
};

export default function Container({
  children,
  className,
  size = "lg",
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 md:px-6",
        sizeClasses[size] ?? sizeClasses.lg,
        className
      )}
    >
      {children}
    </div>
  );
}