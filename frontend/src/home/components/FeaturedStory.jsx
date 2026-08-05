import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { STORY_FEED } from "../constants/storyFeed";

import TagList from "./TagList";
import AuthorHeader from "./AuthorHeader";

export default function FeaturedStory() {
  const story = STORY_FEED.find((story) => story.featured);

  if (!story) return null;

  return (
    <section
      className="
    relative
    overflow-hidden
    rounded-3xl
    border
    bg-card
    p-8
    transition-all
    duration-300
    hover:border-primary/20
    hover:shadow-2xl
  "
    >
      {/* Background Accent */}
      <div
        className="
    absolute
    -right-20
    -top-20
    h-64
    w-64
    rounded-full
    bg-gradient-to-br
    from-primary/20
    to-transparent
    blur-3xl
  "
      />

      <div className="relative z-10 max-w-3xl space-y-6">
        {/* Badge */}

        <span
          className="
            inline-flex
            rounded-full
            bg-primary/10
            px-4
            py-1.5
            text-xs
            font-semibold
            uppercase
            tracking-wider
            text-primary
          "
        >
          Featured Story
        </span>

        {/* Title */}

        <h1
          className="
            text-4xl
            font-bold
            leading-tight
            tracking-tight
            md:text-5xl
          "
        >
          {story.title}
        </h1>
        <p
          className="
    border-l-2
    border-primary
    pl-4
    italic
    text-muted-foreground
  "
        >
          Every senior wishes someone had told them this sooner.
        </p>

        {/* Excerpt */}

        <p
          className="
            max-w-2xl
            text-lg
            leading-8
            text-muted-foreground
          "
        >
          {story.excerpt}
        </p>

        {/* Tags */}

        <TagList tags={story.tags} />

        {/* Author */}

        <AuthorHeader
          author={story.author}
          year={story.year}
          branch={story.branch}
          createdAt={story.createdAt}
        />

        {/* CTA */}

        <Link
          to={`/stories/${story.id}`}
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-primary
            px-6
            py-3
            text-sm
            font-semibold
            text-primary-foreground
            transition-all
            hover:gap-3
          "
        >
          Read Story
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
