import {
  fetchStories,
  fetchStoryById,
  createPost,
  updatePost,
  deleteStory,
} from "../api/story.api";

function mapPostToStory(post) {
  return {
    id: post._id,
    title: post.title,
    content: post.content,
    academicYear: post.academicYear,
    department: post.department,
    tags: post.tags,
    createdAt: post.createdAt,
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

export async function getStories() {
  const data = await fetchStories();

  return {
    stories: data.posts.map(mapPostToStory),
    pagination: data.pagination,
  };
}

export async function createStory(formData) {
  const payload = {
    title: formData.title,
    content: formData.content,
    academicYear: formData.year,
    department: formData.branch,
    tags: formData.tags,
    isAnonymous: formData.anonymous,
  };

  const post = await createPost(payload);

  return mapPostToStory(post);
}

/* Temporary placeholders until backend endpoints are added */

export async function getStoryById(id) {
  const post = await fetchStoryById(id);

  return mapPostToStory(post);
}

export async function updateStory(storyId, formData) {
  const payload = {
    title: formData.title,
    content: formData.content,
    academicYear: formData.year,
    department: formData.branch,
    tags: formData.tags,
    isAnonymous: formData.anonymous,
  };

  const post = await updatePost(storyId, payload);

  return mapPostToStory(post);
}

export async function getRelatedStories(storyId) {
  const { stories } = await getStories();

  return stories.filter((story) => story.id !== storyId);
}

export async function getStoriesByAuthor(authorId) {
  const { stories } = await getStories();

  return stories.filter((story) => story.author?.id === authorId);
}
export async function removeStory(postId) {
  return deleteStory(postId);
}
