export default function StoryMetadata({
  year,
  branch,
  readTime,
  views,
}) {
  return (
    <section className="flex flex-wrap gap-4 text-sm text-muted-foreground">
      <span>{year}</span>

      <span>{branch}</span>

      <span>{readTime}</span>

      <span>{views} views</span>
    </section>
  );
}