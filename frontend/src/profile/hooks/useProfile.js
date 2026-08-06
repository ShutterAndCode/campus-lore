import { useQuery } from "@tanstack/react-query";

import { getMyProfile } from "../api/profile.api";

export function useProfile() {
  return useQuery({
    queryKey: ["profile", "me"],
    queryFn: getMyProfile,
  });
}