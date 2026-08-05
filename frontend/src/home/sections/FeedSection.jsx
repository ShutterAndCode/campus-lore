import HeroSection from "../components/HeroSection";
import FeaturedStory from "../components/FeaturedStory";
import StoryCard from "../components/StoryCard";

import useStories from "../../story/hooks/useStories";

export default function FeedSection() {
  const { stories, loading } = useStories();

  return (
    <div className="space-y-8">
      <HeroSection />

      <FeaturedStory />

      <section className="rounded-3xl border bg-card p-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Recent Stories
            </h2>

            <p className="text-muted-foreground">
              Discover experiences shared by students.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {loading ? (
            <p className="text-muted-foreground">
              Loading stories...
            </p>
          ) : (
            stories.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}