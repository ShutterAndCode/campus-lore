import UpcomingEventsWidget from "./UpcomingEventsWidget";
import TrendingStoriesWidget from "./TrendingStoriesWidget";
import AnnouncementsWidget from "./AnnouncementsWidget";

export default function CampusPulse() {
  return (
    <aside
      className="hidden lg:flex lg:flex-col lg:gap-4 lg:w-80 lg:shrink-0"
      aria-label="Campus Pulse"
    >
      <UpcomingEventsWidget />
      <TrendingStoriesWidget />
      <AnnouncementsWidget />
    </aside>
  );
}