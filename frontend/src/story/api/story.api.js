import authApiClient from "@/auth/utils/axios";

/* ---------- Posts ---------- */

export async function fetchStories(params = {}) {
  const response = await authApiClient.get("/posts", {
    params,
  });

  return response.data.data;
}
export async function fetchStoryById(postId) {
  const response = await authApiClient.get(`/posts/${postId}`);

  return response.data.data;
}
export async function createPost(postData) {
  const response = await authApiClient.post("/posts", postData);

  return response.data.data;
}

/* ---------- Reactions ---------- */

export async function createReaction(postId) {
  const response = await authApiClient.post(`/posts/${postId}/reactions`, {
    reactionType: "like",
  });

  return response.data.data;
}

/* ---------- Comments ---------- */

export async function getComments(postId) {
  const response = await authApiClient.get(`/posts/${postId}/comments`);

  return response.data.data;
}

export async function createComment(postId, content) {
  const response = await authApiClient.post(`/posts/${postId}/comments`, {
    content,
  });

  return response.data.data;
}

export async function deleteComment(postId, commentId) {
  const response = await authApiClient.delete(
    `/posts/${postId}/comments/${commentId}`
  );

  return response.data.data;
}

/* ---------- Future APIs ---------- */

export async function deleteStory(postId) {
  const response = await authApiClient.delete(`/posts/${postId}`);
  return response.data.data;
}

export async function reportPost(postId, reason) {
  const response = await authApiClient.post(`/posts/${postId}/report`, {
    reason,
  });

  return response.data.data;
}
export async function updatePost(postId, postData) {
  const response = await authApiClient.patch(
    `/posts/${postId}`,
    postData
  );

  return response.data.data;
}

