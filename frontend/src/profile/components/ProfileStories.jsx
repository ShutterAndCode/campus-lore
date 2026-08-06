import { useAuthorStories } from "@/story/hooks/queries/useAuthorStories";
import RelatedStories from "@/story/components/RelatedStories";

export default function ProfileStories({ authorId }) {
  const {
    stories,
    loading,
  } = useAuthorStories(authorId);

  if (loading) {
    return (
      <section>
        <p className="text-muted-foreground">
          Loading stories...
        </p>
      </section>
    );
  }

  if (!stories.length) {
    return (
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">
          Stories
        </h2>

        <p className="text-sm text-muted-foreground">
          No stories published yet.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <h2 className="text-xl font-semibold">
        Stories
      </h2>

      <RelatedStories stories={stories} />
    </section>
  );
}