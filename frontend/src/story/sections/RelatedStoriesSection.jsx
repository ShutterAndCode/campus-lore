import RelatedStories from "../components/RelatedStories";
import { useRelatedStories } from "../hooks/queries/useRelatedStories";
import { SectionLoader } from "@/components/feedback";
export default function RelatedStoriesSection({ storyId }) {
  const { stories, loading } = useRelatedStories(storyId);

  if (loading) {
    return <SectionLoader label="Loading related stories..." />;
  }

  return <RelatedStories stories={stories} />;
}
