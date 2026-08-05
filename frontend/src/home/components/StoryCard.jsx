import AuthorHeader from "./AuthorHeader";
import BookmarkButton from "./BookmarkButton";
import TagList from "./TagList";
import ReactionBar from "./ReactionBar";
import { Link } from "react-router-dom";

export default function StoryCard({ story }) {
  return (
    <article
      className="
    group
    cursor-pointer
    rounded-3xl
    border
    border-border
    bg-card
    p-6
    transition-all
    duration-300
    hover:-translate-y-1
    hover:border-primary/30
    hover:shadow-xl
  "
    >
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <AuthorHeader
            author={story.author}
            year={story.year}
            branch={story.branch}
            createdAt={story.createdAt}
          />

          <BookmarkButton bookmarked={story.bookmarked} />
        </div>

        {/* Title */}
        <h2
          className="
    
    text-2xl
    font-bold
    leading-tight
    tracking-tight
    text-foreground
    transition-colors
    group-hover:text-primary
  "
        >
          {story.title}
        </h2>

        {/* Excerpt */}
        <p
          className="
    line-clamp-3
    text-base
    leading-7
    text-muted-foreground
  "
        >
          {story.excerpt}
        </p>

        {/* Read Story */}
        <Link
          to={`/stories/${story.id}`}
          className="inline-flex items-center text-sm font-medium text-primary hover:underline"
        >
          Read Story →
        </Link>

        {/* Tags */}
        <TagList tags={story.tags} />

        {/* Footer */}
        <ReactionBar
          helpful={story.helpful}
          comments={story.comments}
          views={story.views}
        />
      </div>
    </article>
  );
}
