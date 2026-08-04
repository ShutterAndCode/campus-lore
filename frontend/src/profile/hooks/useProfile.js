import { useQuery } from "@tanstack/react-query";

import { getMyProfile } from "../api/profile.api";

export function useProfile() {
  return useQuery({
    queryKey: ["auth", "currentUser"],
    queryFn: getMyProfile,
  });
}