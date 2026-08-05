import { Hash } from "lucide-react";

export default function TagList({ tags = [] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="
            inline-flex
            items-center
            gap-1
            rounded-full
            border
            bg-muted/50
            px-3
            py-1
            text-xs
            text-primary
            font-medium
            transition-all
            duration-200
            hover:border-primary/20
            hover:bg-primary/10
            hover:text-primary
          "
        >
          <Hash className="h-3 w-3" />
          {tag}
        </span>
      ))}
    </div>
  );
}