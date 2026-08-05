import { useQuery } from "@tanstack/react-query";

import { getCommentsByStoryId } from "../../services/comment.service";

export function useComments(storyId) {
  const query = useQuery({
    queryKey: ["comments", storyId],
    queryFn: () => getCommentsByStoryId(storyId),
    enabled: Boolean(storyId),
  });

  return {
    comments: query.data ?? [],
    loading: query.isLoading,
    error: query.error,
    isError: query.isError,
    refetch: query.refetch,
  };
}