import { useQuery } from "@tanstack/react-query";

import { adminService } from "../../services/admin.service";


export function usePosts() {
  return useQuery({
    queryKey: ["admin", "posts"],
    queryFn: adminService.getPosts,
  });
}