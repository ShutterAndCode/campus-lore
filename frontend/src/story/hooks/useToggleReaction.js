import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createReaction } from "../api/story.api";

export default function useToggleReaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId }) => createReaction(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stories"],
      });

      queryClient.invalidateQueries({
        queryKey: ["story"],
        exact: false,
      });
    },

    onError: () => {
      toast.error("Failed to update reaction.");
    },
  });
}
