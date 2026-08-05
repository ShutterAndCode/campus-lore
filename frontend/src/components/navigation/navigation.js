import {
  Home,
  Compass,
  MessageSquare,
  CalendarDays,
} from "lucide-react";

export const navigationItems = [
  {
    label: "Home",
    path: "/",
    icon: Home,
  },
  {
    label: "Explore",
    path: "/explore",
    icon: Compass,
  },
  {
    label: "Discussions",
    path: "/discussions",
    icon: MessageSquare,
  },
  {
    label: "Events",
    path: "/events",
    icon: CalendarDays,
  },
];