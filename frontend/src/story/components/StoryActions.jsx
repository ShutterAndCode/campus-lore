import { Button } from "@/components/ui/button";

import useStoryActions from "../hooks/useStoryActions";
import useToggleReaction from "../hooks/useToggleReaction";
import useDeleteStory from "../hooks/mutations/useDeleteStory";

import { useAuth } from "@/auth";

export default function StoryActions({
  storyId,
  storyAuthorId,
  helpful,
  bookmarked: initialBookmarked,
}) {
  const { bookmarked, handleBookmark, handleShare, handleReport } =
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

  return (
    <section className="flex flex-wrap gap-3">
      <Button
        variant="outline"
        onClick={handleHelpful}
        disabled={reaction.isPending}
      >
        ❤️ {helpful}
      </Button>

      <Button
        variant="outline"
        onClick={handleBookmark}
      >
        🔖 {bookmarked ? "Saved" : "Bookmark"}
      </Button>

      <Button
        variant="outline"
        onClick={handleShare}
      >
        ↗ Share
      </Button>

      <Button
        variant="ghost"
        onClick={handleReport}
      >
        ⚠ Report
      </Button>

      {isOwner && (
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
        >
          {deleteMutation.isPending
            ? "Deleting..."
            : "🗑 Delete"}
        </Button>
      )}
    </section>
  );
}