import { Heart, MessageCircle, Eye, Share2 } from "lucide-react";

export default function ReactionBar({ helpful, comments, views = 356 }) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        border-t
        pt-5
      "
    >
      <div className="flex items-center gap-6">
        <button
          className="
    flex
    items-center
    gap-2
    rounded-lg
    px-2
    py-1
    text-sm
    text-muted-foreground
    transition-all
    duration-200
    hover:scale-105
    hover:text-red-500
    active:scale-95
  "
        >
          <Heart className="h-4 w-4" />
          <span>{helpful}</span>
        </button>

        <button
          className="
    flex
    items-center
    gap-2
    rounded-lg
    px-2
    py-1
    text-sm
    text-muted-foreground
    transition-all
    duration-200
    hover:scale-105
    hover:text-primary
    active:scale-95
  "
        >
          <MessageCircle className="h-4 w-4" />
          <span>{comments}</span>
        </button>

        <div
          className="
            flex
            items-center
            gap-2
            text-sm
            text-muted-foreground
          "
        >
          <Eye className="h-4 w-4" />
          <span>{views}</span>
        </div>
      </div>

      <button
        className="
    flex
    items-center
    gap-2
    rounded-lg
    px-2
    py-1
    text-sm
    font-medium
    text-muted-foreground
    transition-all
    duration-200
    hover:scale-105
    hover:text-primary
    active:scale-95
  "
      >
        <Share2 className="h-4 w-4" />
        Share
      </button>
    </div>
  );
}
