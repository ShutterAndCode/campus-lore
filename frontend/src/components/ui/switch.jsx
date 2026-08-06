import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cn } from "@/lib/utils";

function Switch({ className, ...props }) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        "relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full",
        "bg-slate-700/70 border border-slate-600",
        "transition-all duration-200",
        "data-checked:bg-blue-600 data-checked:border-blue-600",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "block h-5 w-5 rounded-full bg-white shadow-md",
          "transition-transform duration-200",
          "translate-x-0.5",
          "data-checked:translate-x-5"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };