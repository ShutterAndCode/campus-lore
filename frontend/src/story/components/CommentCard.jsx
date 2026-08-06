import { Link } from "react-router-dom";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { formatRelativeTime } from "@/shared/utils/formatRelativeTime";

export default function CommentCard({ comment }) {
  const canNavigate = !comment.isAnonymous && comment.author?.id;
  const profileUrl = canNavigate
    ? `/users/${comment.author.id}`
    : null;

  return (
    <article className="flex gap-3">
      {canNavigate ? (
        <Link to={profileUrl}>
          <Avatar className="transition-opacity hover:opacity-80">
            <AvatarImage src={comment.author.avatar} />

            <AvatarFallback>
              {comment.author.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </Link>
      ) : (
        <Avatar>
          <AvatarImage src={comment.author.avatar} />

          <AvatarFallback>
            {comment.author.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      )}

      <div className="space-y-1">
        {canNavigate ? (
          <Link
            to={profileUrl}
            className="font-medium transition-colors hover:text-primary"
          >
            {comment.author.name}
          </Link>
        ) : (
          <p className="font-medium">
            {comment.author.name}
          </p>
        )}

        <p className="text-sm">
          {comment.text}
        </p>

        <p className="text-xs text-muted-foreground">
          {formatRelativeTime(comment.createdAt)}
        </p>
      </div>
    </article>
  );
}