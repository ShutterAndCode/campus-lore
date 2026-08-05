import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export default function CommentCard({ comment }) {
  return (
    <article className="flex gap-3">

      <Avatar>
        <AvatarImage
          src={comment.author.avatar}
        />

        <AvatarFallback>
          {comment.author.name.charAt(0)}
        </AvatarFallback>

      </Avatar>


      <div className="space-y-1">

        <p className="font-medium">
          {comment.author.name}
        </p>


        <p className="text-sm">
          {comment.text}
        </p>


        <p className="text-xs text-muted-foreground">
          {comment.createdAt}
        </p>

      </div>

    </article>
  );
}