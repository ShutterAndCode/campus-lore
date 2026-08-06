import { useState } from "react";
import { toast } from "sonner";

export default function useStoryActions({
  initialBookmarked = false,
}) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);

  function handleBookmark() {
    setBookmarked((prev) => !prev);

    toast.success(
      bookmarked ? "Bookmark removed." : "Story bookmarked."
    );
  }

  async function handleShare() {
    try {
      await navigator.share({
        title: "CampusLore Story",
        url: window.location.href,
      });
    } catch {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied.");
    }
  }

  function handleReport() {
    toast.info("Report feature coming soon.");
  }

  return {
    bookmarked,
    handleBookmark,
    handleShare,
    handleReport,
  };
}