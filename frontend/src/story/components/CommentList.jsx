import CommentCard from "./CommentCard";


export default function CommentList({ comments }) {

  if (!comments.length) {
    return (
      <p className="text-muted-foreground">
        No comments yet.
      </p>
    );
  }


  return (
    <section className="space-y-6">

      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
        />
      ))}

    </section>
  );
}