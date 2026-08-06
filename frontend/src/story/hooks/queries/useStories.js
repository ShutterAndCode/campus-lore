import { useQuery } from "@tanstack/react-query";

import { getStories } from "../../services/story.service";

export default function useStories() {
  const query = useQuery({
    queryKey: ["stories"],
    queryFn: getStories,
  });

  return {
    stories: query.data?.stories ?? [],
    pagination: query.data?.pagination,
    loading: query.isLoading,
    error: query.error,
    isError: query.isError,
    refetch: query.refetch,
  };
}
