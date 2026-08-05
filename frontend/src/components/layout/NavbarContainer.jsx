import { cn } from "@/lib/utils";

export default function NavbarContainer({
  children,
  className,
}) {
  return (
    <div
      className={cn(
        "w-full px-4 sm:px-6 lg:px-8 xl:px-10",
        className
      )}
    >
      {children}
    </div>
  );
}