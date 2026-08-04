import { useMutation } from "@tanstack/react-query";

import { updateCurrentUser } from "@/api/user.api";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { queryClient } from "@/lib/queryClient";

export function useUpdateProfile() {
  return useMutation({
    mutationFn: updateCurrentUser,

    onSuccess: (updatedUser) => {
      queryClient.setQueryData(
        QUERY_KEYS.USER.ME,
        updatedUser
      );
    },
  });
}