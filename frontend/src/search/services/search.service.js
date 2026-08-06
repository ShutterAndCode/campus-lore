import { fetchStories } from "@/story/api/story.api";
import { formatRelativeTime } from "@/shared/utils/formatRelativeTime";
function mapPostToStory(post) {
  return {
    id: post._id,
    title: post.title,
    content: post.content,
    academicYear: post.academicYear,
    department: post.department,
    tags: post.tags,
    createdAt: formatRelativeTime(post.createdAt),
    anonymous: post.isAnonymous,
    helpful: post.likesCount,
    comments: post.commentsCount,
    bookmarked: false,

    author: {
      id: post.author?._id,
      name: post.isAnonymous ? "Anonymous" : post.author?.name,
      avatar: post.isAnonymous ? "" : post.author?.avatar,
    },
  };
}

export async function searchStories({ query, branch, year }) {
  const params = {};

  if (query.trim()) {
    params.search = query.trim();
  }

  if (branch !== "All") {
    params.department = branch;
  }

  if (year !== "All") {
    params.academicYear = year;
  }

  if (branch !== "All") {
    params.department = branch;
  }

  if (year !== "All") {
    params.academicYear = year;
  }

  const data = await fetchStories(params);

  return data.posts.map(mapPostToStory);
}
