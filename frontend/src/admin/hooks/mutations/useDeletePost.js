import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { adminService } from "../../services/admin.service";


export function useDeletePost() {
  const queryClient = useQueryClient();


  return useMutation({

    mutationFn: ({ postId }) =>
      adminService.deletePost(postId),


    onSuccess: () => {
      toast.success("Post deleted successfully");


      queryClient.invalidateQueries({
        queryKey: ["admin", "posts"],
      });


      queryClient.invalidateQueries({
        queryKey: ["admin", "stats"],
      });
    },


    onError: (error) => {
      toast.error(
        error?.message ||
        "Failed to delete post"
      );
    },

  });
}