import { createReaction } from "../api/post.api";

export async function toggleHelpful(storyId) {
  return createReaction(storyId, "helpful");
}