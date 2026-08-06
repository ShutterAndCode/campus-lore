import { Link } from "react-router-dom";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { formatRelativeTime } from "@/shared/utils/formatRelativeTime";

export default function AuthorHeader({
  author,
  anonymous,
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

  const canNavigate = !anonymous && author?.id;
const profileUrl = canNavigate ? `/users/${author.id}` : null;

  return (
    <div className="flex items-center gap-3">
      {!canNavigate ? (
        <Avatar className="h-12 w-12 border">
          <AvatarImage
            src={author?.avatar}
            alt={author?.name}
          />

          <AvatarFallback className="font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
      ) : (
        <Link to={profileUrl}>
          <Avatar className="h-12 w-12 border transition-opacity hover:opacity-80">
            <AvatarImage
              src={author?.avatar}
              alt={author?.name}
            />

            <AvatarFallback className="font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Link>
      )}

      <div className="min-w-0">
        {!canNavigate ? (
          <h4 className="truncate text-sm font-semibold text-foreground">
            {author?.name}
          </h4>
        ) : (
          <Link
            to={profileUrl}
            className="block truncate text-sm font-semibold text-foreground transition-colors hover:text-primary"
          >
            {author?.name}
          </Link>
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