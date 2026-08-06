import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createComment } from "../../api/story.api";

export default function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, content }) =>
      createComment(postId, content),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });

      queryClient.invalidateQueries({
        queryKey: ["story", variables.postId],
        exact: false,
      });

      queryClient.invalidateQueries({
        queryKey: ["stories"],
      });

      toast.success("Comment posted.");
    },

    onError: () => {
      toast.error("Failed to post comment.");
    },
  });
}