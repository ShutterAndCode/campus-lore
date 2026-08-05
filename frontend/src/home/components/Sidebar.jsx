import {
  Home,
  Compass,
  MessageSquare,
  CircleHelp,
  Bookmark,
  User,
} from "lucide-react";

import SidebarItem from "./SidebarItem";

const ITEMS = [
  { label: "Home", icon: Home },
  { label: "Explore", icon: Compass },
  { label: "Discussions", icon: MessageSquare },
  { label: "Ask", icon: CircleHelp },
  { label: "Bookmarks", icon: Bookmark },
  { label: "Profile", icon: User },
];

export default function Sidebar() {
  return (
    <div className="rounded-3xl border bg-card p-4 shadow-sm">
      <h2 className="mb-5 px-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Navigation
      </h2>

      <nav className="space-y-1">
        {ITEMS.map((item) => (
          <SidebarItem
            key={item.label}
            {...item}
          />
        ))}
      </nav>
    </div>
  );
}