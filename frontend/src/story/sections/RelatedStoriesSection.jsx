import RelatedStories from "../components/RelatedStories";
import { useRelatedStories } from "../hooks/useRelatedStories";

export default function RelatedStoriesSection({ storyId }) {
  const {
    stories,
    loading,
  } = useRelatedStories(storyId);


  if (loading) {
    return (
      <p className="text-sm text-muted-foreground">
        Loading related stories...
      </p>
    );
  }


  return (
    <RelatedStories stories={stories} />
  );
}