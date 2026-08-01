import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { createComment, createReply, getPostComments } from '../services/comment.service.js';

export const createCommentController = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  const comment = await createComment(postId, req.user._id, content);
  res.status(201).json(new ApiResponse(201, comment, 'Comment created successfully'));
});

export const createReplyController = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;
  const reply = await createReply(commentId, req.user._id, content);
  res.status(201).json(new ApiResponse(201, reply, 'Reply created successfully'));
});

export const getPostCommentsController = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const comments = await getPostComments(postId);
  res.status(200).json(new ApiResponse(200, comments, 'Comments fetched successfully'));
});