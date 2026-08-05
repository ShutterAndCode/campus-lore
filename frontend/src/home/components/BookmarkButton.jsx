import { Bookmark } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function BookmarkButton({
  bookmarked = false,
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="
        rounded-full
        text-muted-foreground
        hover:text-primary
      "
    >
      <Bookmark
        className="h-5 w-5"
        fill={bookmarked ? "currentColor" : "none"}
      />
    </Button>
  );
}