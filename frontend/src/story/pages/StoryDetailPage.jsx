import { useParams } from "react-router-dom";

import { useStory } from "../hooks/queries/useStory";
import StoryDetailLayout from "../layouts/StoryDetailLayout";
import { FullPageLoader } from "@/components/feedback";

export default function StoryDetailPage() {
  const { storyId } = useParams();

  const { story, loading, error } = useStory(storyId);

  if (loading) {
    return <FullPageLoader label="Loading story..." />;
  }

  if (error) {
    return <ErrorState onRetry={refetch} />;
  }

  if (!story) {
    return <div className="p-8">Story not found.</div>;
  }

  return <StoryDetailLayout story={story} />;
}
