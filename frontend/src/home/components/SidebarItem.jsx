import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function SidebarItem({
  label,
  icon: Icon,
}) {
  return (
    <Button
      variant="ghost"
      className="
        h-12
        w-full
        justify-between
        rounded-xl
        px-3
        hover:bg-primary/10
      "
    >
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5" />

        <span>{label}</span>
      </div>

      <ChevronRight className="h-4 w-4 opacity-40" />
    </Button>
  );
}