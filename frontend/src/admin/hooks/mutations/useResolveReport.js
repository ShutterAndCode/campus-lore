import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { adminService } from "../../services/admin.service";


export function useResolveReport() {
  const queryClient = useQueryClient();


  return useMutation({

    mutationFn: ({ reportId }) =>
      adminService.resolveReport(reportId),


    onSuccess: () => {

      toast.success(
        "Report resolved and post removed"
      );


      queryClient.invalidateQueries({
        queryKey: ["admin", "reports"],
      });


      queryClient.invalidateQueries({
        queryKey: ["admin", "posts"],
      });


      queryClient.invalidateQueries({
        queryKey: ["admin", "stats"],
      });

    },


    onError: (error) => {

      toast.error(
        error?.message ||
        "Failed to resolve report"
      );

    },

  });
}