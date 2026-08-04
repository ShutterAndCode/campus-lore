import { cn } from "@/lib/utils";

export default function Page({ children, className }) {
  return (
    <div
      className={cn(
        "bg-background py-8",
        className
      )}
    >
      {children}
    </div>
  );
}