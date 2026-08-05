export default function StoryContent({ content }) {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <p>{content}</p>
    </article>
  );
}