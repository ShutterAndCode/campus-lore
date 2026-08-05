import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export default function AuthorHeader({
  author,
  year,
  branch,
  createdAt,
}) {
  const initials = author?.name
    ? author.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "?";

  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-12 w-12 border">
        <AvatarImage
          src={author?.avatar}
          alt={author?.name}
        />

        <AvatarFallback className="font-semibold">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0">
        <h4 className="truncate text-sm font-semibold text-foreground">
          {author?.name}
        </h4>

        <p className="text-xs text-muted-foreground">
          {year}
          {branch && ` • ${branch}`}
          {createdAt && ` • ${createdAt}`}
        </p>
      </div>
    </div>
  );
}