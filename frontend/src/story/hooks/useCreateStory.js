import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createStory } from "../services/story.service";

export function useCreateStory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStory,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stories"],
      });
    },
  });
}