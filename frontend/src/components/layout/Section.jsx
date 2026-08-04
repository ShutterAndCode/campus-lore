import { cn } from "@/lib/utils";

const spacingMap = {
  none: "",
  sm: "py-4 md:py-6",
  default: "py-8 md:py-12",
  lg: "py-12 md:py-16",
  xl: "py-16 md:py-24",
};

export default function Section({
  children,
  spacing = "default",
  className,
  ...props
}) {
  return (
    <section
      className={cn(
        spacingMap[spacing],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}