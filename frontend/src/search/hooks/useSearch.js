import { useQuery } from "@tanstack/react-query";

import { searchStories } from "../services/search.service";

export function useSearch(filters) {
  const query = useQuery({
    queryKey: ["search", filters],

    queryFn: () => searchStories(filters),
  });

  return {
    stories: query.data ?? [],
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}