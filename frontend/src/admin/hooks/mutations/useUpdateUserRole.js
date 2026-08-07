import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { adminService } from "../../services/admin.service";


export function useUpdateUserRole() {
  const queryClient = useQueryClient();


  return useMutation({
    mutationFn: ({ userId, role }) =>
      adminService.updateUserRole(userId, role),


    onSuccess: () => {
      toast.success("User role updated successfully");


      queryClient.invalidateQueries({
        queryKey: ["admin", "users"],
      });
    },


    onError: (error) => {
      const message =
        error?.message ||
        "Failed to update user role";


      if (
        message.toLowerCase().includes("cannot change your own role")
      ) {
        toast.warning(
          "You cannot change your own admin role."
        );

        return;
      }


      toast.error(message);
    },
  });
}