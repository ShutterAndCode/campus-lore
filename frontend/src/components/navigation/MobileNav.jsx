import { Menu } from "lucide-react";
import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { navigationItems } from "@/config/navigation";
import NavItem from "./NavItem";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
    >
      <SheetTrigger
        className="
          inline-flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          border
          border-border
          bg-background
          transition-colors
          hover:bg-muted
        "
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>

      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle>
            CampusLore
          </SheetTitle>
        </SheetHeader>

        <nav className="mt-8 flex flex-col gap-2">
          {navigationItems.map((item) => (
            <NavItem
              key={item.path}
              label={item.label}
              path={item.path}
              className="w-full"
              onClick={() => setOpen(false)}
            />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}