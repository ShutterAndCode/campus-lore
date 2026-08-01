import Comment from '../models/comment.model.js';
import ExperiencePost from '../models/experiencePost.model.js';
import ApiError from '../utils/ApiError.js';
import { PUBLIC_PROFILE_FIELDS } from './profile.service.js';

export const createComment = async (postId, authorId, content) => {
  const post = await ExperiencePost.findById(postId);
  if (!post) {
    throw new ApiError(404, 'Post not found');
  }

  const comment = await Comment.create({
    post: postId,
    author: authorId,
    content,
    parentComment: null,
  });

  post.commentsCount += 1;
  await post.save();

  return comment;
};

export const createReply = async (parentCommentId, authorId, content) => {
  const parentComment = await Comment.findById(parentCommentId);
  if (!parentComment) {
    throw new ApiError(404, 'Comment not found');
  }

  if (parentComment.parentComment !== null) {
    throw new ApiError(400, 'Replies to replies are not allowed');
  }

  const reply = await Comment.create({
    post: parentComment.post,
    author: authorId,
    content,
    parentComment: parentCommentId,
  });

  await ExperiencePost.findByIdAndUpdate(parentComment.post, { $inc: { commentsCount: 1 } });

  return reply;
};

export const getPostComments = async (postId) => {
  const topLevelComments = await Comment.find({ post: postId, parentComment: null })
    .populate('author', PUBLIC_PROFILE_FIELDS)
    .sort({ createdAt: 1 });

  const commentIds = topLevelComments.map((c) => c._id);

  const replies = await Comment.find({ parentComment: { $in: commentIds } })
    .populate('author', PUBLIC_PROFILE_FIELDS)
    .sort({ createdAt: 1 });

  const repliesByParent = {};
  for (const reply of replies) {
    const key = reply.parentComment.toString();
    if (!repliesByParent[key]) repliesByParent[key] = [];
    repliesByParent[key].push(reply);
  }

  return topLevelComments.map((comment) => ({
    ...comment.toObject(),
    replies: repliesByParent[comment._id.toString()] || [],
  }));
};
//read this,imp to understand