import authApiClient from "@/auth/utils/axios";

export async function getPosts(params = {}) {
  const response = await authApiClient.get("/posts", {
    params,
  });

  return response.data.data;
}

export async function createReaction(postId, reactionType) {
  const response = await authApiClient.post(
    `/posts/${postId}/reactions`,
    {
      reactionType,
    }
  );

  return response.data.data;
}

export async function getComments(postId) {
  const response = await authApiClient.get(
    `/posts/${postId}/comments`
  );

  return response.data.data;
}

export async function createComment(postId, content) {
  const response = await authApiClient.post(
    `/posts/${postId}/comments`,
    {
      content,
    }
  );

  return response.data.data;
}

export async function deleteComment(postId, commentId) {
  const response = await authApiClient.delete(
    `/posts/${postId}/comments/${commentId}`
  );

  return response.data.data;
}