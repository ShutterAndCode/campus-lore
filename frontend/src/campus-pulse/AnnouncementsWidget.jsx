import { Megaphone } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import WidgetCard from "./WidgetCard";

const placeholderAnnouncements = [
  { id: 1, text: "Mid-semester exam schedule released." },
  { id: 2, text: "Library timings extended during exam week." },
];

export default function AnnouncementsWidget() {
  return (
    <WidgetCard icon={Megaphone} title="Announcements">
      <div className="space-y-3">
        {placeholderAnnouncements.map((item, index) => (
          <div key={item.id}>
            <p className="text-sm text-muted-foreground leading-snug">{item.text}</p>
            {index < placeholderAnnouncements.length - 1 && <Separator className="mt-3" />}
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}