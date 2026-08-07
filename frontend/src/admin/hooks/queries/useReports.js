import { useQuery } from "@tanstack/react-query";

import { adminService } from "../../services/admin.service";


export function useReports() {
  return useQuery({
    queryKey: ["admin", "reports"],

    queryFn: () =>
      adminService.getReports(),
  });
}