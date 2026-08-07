import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { formatRelativeTime } from "@/shared/utils/formatRelativeTime";

export default function AuthorHeader({
  author,
  anonymous,
  year,
  branch,
  createdAt,
}) {
  const authorId = author?._id || author?.id;

  const initials = author?.name
    ? author.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "?";

  const canNavigate = !anonymous && authorId;

  const profileUrl = canNavigate ? `/users/${authorId}` : null;

  const avatar = (
    <Avatar className="h-12 w-12 border transition-opacity hover:opacity-80">
      <AvatarImage
        src={anonymous ? undefined : author?.avatar}
        alt={author?.name}
      />

      <AvatarFallback className="font-semibold">{initials}</AvatarFallback>
    </Avatar>
  );

  return (
    <div className="flex items-center gap-3">
      {canNavigate ? <Link to={profileUrl}>{avatar}</Link> : avatar}

      <div className="min-w-0">
        {canNavigate ? (
          <Link
            to={profileUrl}
            className="block truncate text-sm font-semibold text-foreground transition-colors hover:text-primary"
          >
            {author?.name}
          </Link>
        ) : (
          <h4 className="truncate text-sm font-semibold text-foreground">
            {anonymous ? "Anonymous" : author?.name}
          </h4>
        )}

        <p className="text-xs text-muted-foreground">
          {year}

          {branch && ` • ${branch}`}

          {createdAt && ` • ${formatRelativeTime(createdAt)}`}
        </p>
      </div>
    </div>
  );
}
