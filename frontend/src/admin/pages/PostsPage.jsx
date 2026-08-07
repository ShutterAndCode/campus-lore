import { usePosts } from "../hooks/queries/usePosts";
import PostTable from "../components/PostTable";


export default function PostsPage() {

  const {
    data,
    isLoading,
    isError,
  } = usePosts();


  if (isLoading) {
    return <div>Loading posts...</div>;
  }


  if (isError) {
    return <div>Failed to load posts.</div>;
  }


  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold">
          Posts
        </h1>

        <p className="text-muted-foreground">
          Manage and moderate community posts.
        </p>
      </div>


      <PostTable posts={data} />

    </div>
  );
}