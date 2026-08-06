import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import  useCreateComment  from "../hooks/mutations/useCreateComment";

export default function ReplyPlaceholder({ storyId }) {
  const [content, setContent] = useState("");

  const { mutate, isPending } = useCreateComment(storyId);

  function handleSubmit() {
    const text = content.trim();

    if (!text) {
      return;
    }

    mutate({
    postId: storyId,
    content: text,
  }, {
      onSuccess: () => {
        toast.success("Comment posted");
        setContent("");
      },
      onError: () => {
        toast.error("Failed to post comment");
      },
    });
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && event.ctrlKey) {
      event.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className="space-y-3 rounded-lg border bg-card p-4">
      <Textarea
        placeholder="Share your thoughts..."
        value={content}
        disabled={isPending}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Press Ctrl + Enter to post
        </p>

        <Button
          onClick={handleSubmit}
          disabled={isPending || !content.trim()}
        >
          {isPending ? "Posting..." : "Post Comment"}
        </Button>
      </div>
    </div>
  );
}