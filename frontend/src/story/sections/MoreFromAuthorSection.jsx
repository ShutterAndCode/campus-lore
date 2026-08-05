import RelatedStories from "../components/RelatedStories";
import { useAuthorStories } from "../hooks/useAuthorStories";


export default function MoreFromAuthorSection({
  authorId,
  authorName,
}) {

  const {
    stories,
    loading,
  } = useAuthorStories(authorId);


  if (loading) {
    return null;
  }


  return (
    <section className="space-y-5">

      <h2 className="text-xl font-semibold">
        More from {authorName}
      </h2>


      <RelatedStories stories={stories}/>

    </section>
  );
}