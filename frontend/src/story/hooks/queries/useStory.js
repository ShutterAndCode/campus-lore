import { useQuery } from "@tanstack/react-query";
import { getStoryById } from "../../services/story.service";

export function useStory(storyId) {
  const query = useQuery({
    queryKey: ["story", storyId],
    queryFn: () => getStoryById(storyId),
    enabled: !!storyId,
  });

  return {
    story: query.data ?? null,
    loading: query.isLoading,
    error: query.error,
    isError: query.isError,
    refetch: query.refetch,
  };
}
