import PostReaction from '../models/postReaction.model.js';
import ExperiencePost from '../models/experiencePost.model.js';
import ApiError from '../utils/ApiError.js';

export const toggleReaction = async (postId, userId, reactionType) => {
  const post = await ExperiencePost.findById(postId);
  if (!post) {
    throw new ApiError(404, 'Post not found');
  }

  const existingReaction = await PostReaction.findOne({ user: userId, post: postId });

  if (!existingReaction) {
    await PostReaction.create({ user: userId, post: postId, reactionType });
    post.likesCount += 1;
    await post.save();
    return { reacted: true, reactionType };
  }

  if (existingReaction.reactionType === reactionType) {
    await existingReaction.deleteOne();
    post.likesCount = Math.max(0, post.likesCount - 1);
    await post.save();
    return { reacted: false, reactionType: null };
  }

  existingReaction.reactionType = reactionType;
  await existingReaction.save();
  return { reacted: true, reactionType };
};
//fetch-then-mutate-then-save