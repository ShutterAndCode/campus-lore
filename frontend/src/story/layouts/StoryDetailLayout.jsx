import AuthorSection from "../components/AuthorSection";
import StoryMetadata from "../components/StoryMetadata";
import StoryContent from "../components/StoryContent";
import StoryTags from "../components/StoryTags";
import StoryActions from "../components/StoryActions";
import CommentsSection from "../sections/CommentsSection";
import RelatedStoriesSection from "../sections/RelatedStoriesSection";
import MoreFromAuthorSection from "../sections/MoreFromAuthorSection";

export default function StoryDetailLayout({ story }) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 space-y-8">
      <section className="space-y-4">
        <AuthorSection
          author={story.author}
          year={story.year}
          branch={story.branch}
        />

        <StoryMetadata
          year={story.year}
          branch={story.branch}
          readTime={story.readTime}
          views={story.views}
        />
      </section>
      <section className="space-y-6 mt-8">
        <h1 className="text-3xl font-bold tracking-tight">{story.title}</h1>

        <StoryContent content={story.content} />

        <StoryTags tags={story.tags} />

        <StoryActions
          storyId={story.id}
          storyAuthorId={story.author.id}
          helpful={story.helpful}
          bookmarked={story.bookmarked}
        />
        <CommentsSection storyId={story.id} />
        <RelatedStoriesSection storyId={story.id} />
        <MoreFromAuthorSection
          authorId={story.author.id}
          authorName={story.author.name}
        />
      </section>
    </main>
  );
}
