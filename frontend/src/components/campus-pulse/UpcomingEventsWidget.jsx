import { Calendar } from "lucide-react";
import WidgetCard from "./WidgetCard";

const placeholderEvents = [
  { id: 1, title: "Tech Fest Hackathon", date: "Aug 12" },
  { id: 2, title: "Placement Drive - Infosys", date: "Aug 15" },
  { id: 3, title: "AI/ML Workshop", date: "Aug 18" },
];

export default function UpcomingEventsWidget() {
  return (
    <WidgetCard icon={Calendar} title="Upcoming Events">
      <ul className="space-y-3">
        {placeholderEvents.map((event) => (
          <li key={event.id} className="flex items-center justify-between text-sm">
            <span className="text-foreground">{event.title}</span>
            <span className="text-xs text-muted-foreground">{event.date}</span>
          </li>
        ))}
      </ul>
    </WidgetCard>
  );
}