import RelatedStoryCard from "./RelatedStoryCard";

export default function RelatedStories({ stories }) {
  if (!stories.length) {
    return null;
  }

  return (
    <section className="space-y-5">
      <h2 className="text-xl font-semibold">
        Related Stories
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {stories.map((story) => (
          <RelatedStoryCard
            key={story.id}
            story={story}
          />
        ))}
      </div>
    </section>
  );
}