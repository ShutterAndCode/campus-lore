import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotificationButton() {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Notifications"
      className="relative rounded-full"
    >
      <Bell className="h-5 w-5" />

      <span
        className="
          absolute
          right-2
          top-2
          h-2
          w-2
          rounded-full
          bg-primary
        "
      />
    </Button>
  );
}