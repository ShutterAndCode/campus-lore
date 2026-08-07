import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import useStoryActions from "../hooks/useStoryActions";
import useToggleReaction from "../hooks/queries/useToggleReaction";
import useDeleteStory from "../hooks/mutations/useDeleteStory";

import { useAuth } from "@/auth";
import { useState } from "react";
import ReportDialog from "@/report/components/ReportDialog";
export default function StoryActions({
  storyId,
  storyAuthorId,
  helpful,
  bookmarked: initialBookmarked,
}) {
  const navigate = useNavigate();
  const [reportOpen, setReportOpen] = useState(false);
  const { bookmarked, handleBookmark, handleShare} =
    useStoryActions({
      storyId,
      initialBookmarked,
    });

  const { user } = useAuth();

  const reaction = useToggleReaction();
  const deleteMutation = useDeleteStory();

  const isOwner = user?._id === storyAuthorId;

  function handleHelpful() {
    reaction.mutate(
      {
        postId: storyId,
        reactionType: "like",
      },
      {
        onError: () => {
          console.error("Failed to toggle reaction");
        },
      }
    );
  }

  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this story?"
    );

    if (!confirmed) return;

    deleteMutation.mutate(storyId);
  }

  function handleEdit() {
    navigate(`/stories/${storyId}/edit`);
  }

  return (
    <section className="flex flex-wrap gap-3">
      <Button
        variant="outline"
        onClick={handleHelpful}
        disabled={reaction.isPending}
      >
        ❤️ {helpful}
      </Button>

      <Button variant="outline" onClick={handleBookmark}>
        🔖 {bookmarked ? "Saved" : "Bookmark"}
      </Button>

      <Button variant="outline" onClick={handleShare}>
        ↗ Share
      </Button>

      <Button variant="ghost" onClick={() => setReportOpen(true)}>
        ⚠ Report
      </Button>

      <ReportDialog
        open={reportOpen}
        onOpenChange={setReportOpen}
        postId={storyId}
      />

      {isOwner && (
        <>
          <Button variant="outline" onClick={handleEdit}>
            ✏️ Edit
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "🗑 Delete"}
          </Button>
        </>
      )}
    </section>
  );
}
