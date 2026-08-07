import { Bell } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export default function NotificationButton() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      onClick={() =>
        toast.info("Notifications are coming soon! 🔔")
      }
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