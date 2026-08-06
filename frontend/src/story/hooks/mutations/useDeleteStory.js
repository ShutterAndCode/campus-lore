import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { removeStory } from "../../services/story.service";

export default function useDeleteStory() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: removeStory,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stories"],
      });

      toast.success("Story deleted successfully.");

      navigate("/");
    },

    onError: () => {
      toast.error("Failed to delete story.");
    },
  });
}