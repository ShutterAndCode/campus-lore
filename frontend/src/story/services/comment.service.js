import {
  getComments,
  createComment,
} from "../api/post.api";

function mapComment(comment) {
  return {
    id: comment._id,

    text: comment.content,

    createdAt: comment.createdAt,

    author: {
      id: comment.author?._id,

      name: comment.author?.name ?? "Anonymous",

      avatar: comment.author?.avatar ?? "",
    },
  };
}

export async function getCommentsByStoryId(storyId) {
  const comments = await getComments(storyId);

  return comments.map(mapComment);
}

export async function addComment(storyId, content) {
  const comment = await createComment(storyId, content);

  return mapComment(comment);
}