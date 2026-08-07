import { Link } from "react-router-dom";

import AuthorHeader from "./AuthorHeader";
import BookmarkButton from "./BookmarkButton";
import TagList from "./TagList";
import ReactionBar from "./ReactionBar";

export default function StoryCard({ story }) {
  return (
    <article className="group min-w-0">
      <div className="min-w-0 rounded-2xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <AuthorHeader
            author={story.author}
            anonymous={story.isAnonymous}
            year={story.academicYear}
            branch={story.department}
            createdAt={story.createdAt}
          />

          <div className="shrink-0">
            <BookmarkButton bookmarked={story.bookmarked} />
          </div>
        </div>

        {/* Title */}
        <h2
          className="
            break-words
            text-xl
            font-bold
            leading-tight
            tracking-tight
            text-foreground
            transition-colors
            group-hover:text-primary
            sm:text-2xl
          "
        >
          {story.title}
        </h2>

        {/* Excerpt */}
        <p
          className="
            mt-3
            line-clamp-3
            break-words
            overflow-hidden
            text-sm
            leading-6
            text-muted-foreground
            sm:text-base
            sm:leading-7
          "
        >
          {story.excerpt}
        </p>

        {/* Read Story */}
        <Link
          to={`/stories/${story.id}`}
          className="mt-4 inline-flex w-fit items-center text-sm font-medium text-primary transition-colors hover:underline"
        >
          Read Story →
        </Link>

        {/* Tags */}
        <div className="mt-4">
          <TagList tags={story.tags} />
        </div>

        {/* Footer */}
        <div className="mt-5">
          <ReactionBar
            helpful={story.helpful}
            comments={story.comments}
            views={story.views}
          />
        </div>
      </div>
    </article>
  );
}
