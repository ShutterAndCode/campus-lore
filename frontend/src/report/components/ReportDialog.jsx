import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import useCreateReport from "../mutations/useCreateReport";

export default function ReportDialog({ open, onOpenChange, postId }) {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");

  const mutation = useCreateReport();

  function handleSubmit() {
    mutation.mutate({
      postId,

      data: {
        reason,
        description,
      },
    });

    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report this story</DialogTitle>
        </DialogHeader>

        <Select value={reason} onValueChange={setReason}>
          <SelectTrigger>
            <SelectValue placeholder="Reason" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="spam">Spam</SelectItem>

            <SelectItem value="harassment">Harassment</SelectItem>

            <SelectItem value="inappropriate_content">
              Inappropriate content
            </SelectItem>

            <SelectItem value="misinformation">Misinformation</SelectItem>

            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>

        <Textarea
          placeholder="Additional details (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button onClick={handleSubmit} disabled={!reason || mutation.isPending}>
          {mutation.isPending ? "Submitting..." : "Submit Report"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
