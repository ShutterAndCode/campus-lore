import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateStory } from "../services/story.service";

export function useUpdateStory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ storyId, data }) =>
      updateStory(storyId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["stories"],
      });

      queryClient.invalidateQueries({
        queryKey: ["story", variables.storyId],
      });
    },
  });
}