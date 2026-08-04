import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "@/auth";

export default function useProfile() {
  return useQuery({
    queryKey: ["auth", "currentUser"],
    queryFn: getCurrentUser,
  });
}