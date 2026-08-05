import { useQuery } from "@tanstack/react-query";

import { getRelatedStories } from "../../services/story.service";

export function useRelatedStories(storyId) {
  const query = useQuery({
    queryKey: ["relatedStories", storyId],
    queryFn: () => getRelatedStories(storyId),
    enabled: Boolean(storyId),
  });

  return {
    stories: query.data ?? [],
    loading: query.isLoading,
    error: query.error,
    isError: query.isError,
  };
}