import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "@/api/user.api";
import { QUERY_KEYS } from "@/lib/queryKeys";

export function useProfile() {
  return useQuery({
    queryKey: QUERY_KEYS.USER.ME,
    queryFn: getCurrentUser,
  });
}