import {
  PenSquare,
  CircleHelp,
  MessageSquare,
} from "lucide-react";

export const QUICK_ACTIONS = [
  {
    title: "Share a Story",
    description: "Help juniors with your experience.",
    icon: PenSquare,
    href: "/stories/create",
  },
  {
    title: "Ask a Question",
    description: "Get guidance from seniors.",
    icon: CircleHelp,
    href: "/questions/create",
  },
  {
    title: "Start Discussion",
    description: "Discuss clubs, placements & campus.",
    icon: MessageSquare,
    href: "/discussions/create",
  },
];