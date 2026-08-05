import CommentList from "../components/CommentList";
import ReplyPlaceholder from "../components/ReplyPlaceholder";
import { useComments } from "../hooks/useComments";


export default function CommentsSection({ storyId }) {

  const {
    comments,
    loading,
  } = useComments(storyId);


  if (loading) {
    return (
      <p>
        Loading comments...
      </p>
    );
  }


  return (
    <section className="space-y-6">

      <h2 className="text-xl font-semibold">
        Comments
      </h2>


      <ReplyPlaceholder />


      <CommentList comments={comments}/>

    </section>
  );
}