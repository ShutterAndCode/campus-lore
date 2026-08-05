import CommentList from "../components/CommentList";
import ReplyPlaceholder from "../components/ReplyPlaceholder";
import { useComments } from "../hooks/queries/useComments";
import { SectionLoader } from "@/components/feedback";
export default function CommentsSection({ storyId }) {
  const { comments, loading } = useComments(storyId);

  if (loading) {
    return <SectionLoader label="Loading related stories..." />;
  }

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">Comments</h2>

      <ReplyPlaceholder />

      <CommentList comments={comments} />
    </section>
  );
}
