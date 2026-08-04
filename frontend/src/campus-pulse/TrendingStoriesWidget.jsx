import { TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import WidgetCard from "./WidgetCard";

const placeholderStories = [
  { id: 1, title: "How I cracked my first internship interview", tag: "Placements" },
  { id: 2, title: "A guide to hostel life at NIT", tag: "Campus Life" },
  { id: 3, title: "Research opportunities for freshers", tag: "Academics" },
];

export default function TrendingStoriesWidget() {
  return (
    <WidgetCard icon={TrendingUp} title="Trending Stories">
      <ul className="space-y-3">
        {placeholderStories.map((story) => (
          <li key={story.id} className="space-y-1">
            <p className="text-sm text-foreground leading-snug">{story.title}</p>
            <Badge variant="secondary" className="text-xs">{story.tag}</Badge>
          </li>
        ))}
      </ul>
    </WidgetCard>
  );
}