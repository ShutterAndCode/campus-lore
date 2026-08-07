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

import { useAuth } from "@/auth";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            className="rounded-md p-2 transition-colors hover:bg-accent"
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-[85vw] max-w-xs overflow-y-auto px-4 sm:max-w-sm"
        >
          <SheetHeader>
            <SheetTitle>CampusLore</SheetTitle>
          </SheetHeader>

          <nav className="mt-6 flex flex-col gap-1">
            {navigationItems.map((item) => (
              <NavItem
                key={item.path}
                label={item.label}
                path={item.path}
                className="w-full"
                onClick={() => setOpen(false)}
              />
            ))}

            {user?.role === "admin" && (
              <NavItem
                label="Admin Dashboard"
                path="/admin"
                className="w-full"
                onClick={() => setOpen(false)}
              />
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}