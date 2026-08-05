import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function SearchBar({ className }) {
  return (
    <div
      className={cn(
        "relative hidden xl:block w-full",
        className
      )}
    >
      <Search
        className="
          absolute
          left-3
          top-1/2
          h-4
          w-4
          -translate-y-1/2
          text-muted-foreground
        "
      />

      <Input
        type="search"
        placeholder="Search stories, discussions, events..."
        className="
          h-10
          w-full
          rounded-full
          border-none
          bg-muted/70
          pl-10
          shadow-none
          focus-visible:ring-2
        "
      />
    </div>
  );
}