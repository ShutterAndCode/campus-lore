import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";

export default function RelatedStoryCard({ story }) {
  const canNavigate = !story.anonymous && story.author?.id;
  const profileUrl = canNavigate
    ? `/users/${story.author.id}`
    : null;

  return (
    <article
      className="
        rounded-2xl
        border
        border-border
        bg-card
        p-5
        transition
        hover:shadow-md
      "
    >
      <h3 className="text-lg font-semibold">
        {story.title}
      </h3>

      {canNavigate ? (
        <Link
          to={profileUrl}
          className="mt-2 inline-block text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          {story.author.name}
        </Link>
      ) : (
        <p className="mt-2 text-sm text-muted-foreground">
          {story.author.name}
        </p>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        {story.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
          >
            {tag}
          </Badge>
        ))}
      </div>

      <Link
        to={`/stories/${story.id}`}
        className="
          mt-4
          inline-flex
          text-sm
          font-medium
          text-primary
          hover:underline
        "
      >
        Read Story →
      </Link>
    </article>
  );
}