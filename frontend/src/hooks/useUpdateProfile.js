import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCurrentUser } from "@/auth";

export default function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCurrentUser,

    onSuccess: (updatedUser) => {
      queryClient.setQueryData(
        ["auth", "currentUser"],
        updatedUser
      );
    },
  });
}