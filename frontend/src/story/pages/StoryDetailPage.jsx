import { useParams } from "react-router-dom";

import { useStory } from "../hooks/useStory";
import StoryDetailLayout from "../layouts/StoryDetailLayout";

export default function StoryDetailPage() {
  const { storyId } = useParams();

  const { story, loading, error } = useStory(storyId);

  if (loading) {
    return <div className="p-8">Loading story...</div>;
  }

  if (error) {
    return <div className="p-8">Something went wrong.</div>;
  }

  if (!story) {
    return <div className="p-8">Story not found.</div>;
  }

  return <StoryDetailLayout story={story} />;
}