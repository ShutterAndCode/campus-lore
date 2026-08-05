import { Button } from "@/components/ui/button";

import { useStoryActions } from "../hooks/useStoryActions";


export default function StoryActions({
  storyId,
  helpful,
  bookmarked: initialBookmarked,
}) {

  const {
    bookmarked,
    handleBookmark,
    handleShare,
    handleReport,
  } = useStoryActions({
    storyId,
    initialBookmarked,
  });


  return (
    <section className="flex flex-wrap gap-3">

      <Button variant="outline">
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

    </section>
  );
}