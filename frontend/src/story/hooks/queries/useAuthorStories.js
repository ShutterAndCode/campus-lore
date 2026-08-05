import { useQuery } from "@tanstack/react-query";

import { getStoriesByAuthor } from "../../services/story.service";

export function useAuthorStories(authorId) {
  const query = useQuery({
    queryKey: ["authorStories", authorId],
    queryFn: () => getStoriesByAuthor(authorId),
    enabled: Boolean(authorId),
  });

  return {
    stories: query.data ?? [],
    loading: query.isLoading,
    error: query.error,
    isError: query.isError,
  };
}