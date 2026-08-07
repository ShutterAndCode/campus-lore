import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { submitReport } from "../services/report.service";


export default function useCreateReport() {

  return useMutation({

    mutationFn: ({ postId, data }) =>
      submitReport(postId, data),


    onSuccess: () => {
      toast.success(
        "Report submitted successfully"
      );
    },


    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
        "Failed to submit report"
      );
    },

  });
}