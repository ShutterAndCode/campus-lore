import { Badge } from "@/components/ui/badge";

export default function StoryTags({ tags }) {
  if (!tags?.length) {
    return null;
  }

  return (
    <section className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag} variant="secondary">
          {tag}
        </Badge>
      ))}
    </section>
  );
}