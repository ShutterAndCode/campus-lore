import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { adminService } from "../../services/admin.service";


export function useUpdateReportStatus() {
  const queryClient = useQueryClient();


  return useMutation({

    mutationFn: ({ reportId, status }) =>
      adminService.updateReportStatus(
        reportId,
        status
      ),


    onSuccess: () => {
      toast.success(
        "Report status updated"
      );


      queryClient.invalidateQueries({
        queryKey: ["admin", "reports"],
      });
    },


    onError: (error) => {
      toast.error(
        error?.message ||
        "Failed to update report"
      );
    },

  });
}