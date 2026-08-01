import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { createPost } from '../services/post.service.js';

export const createPostController = asyncHandler(async (req, res) => {
  const post = await createPost(req.user._id, req.body);
  res.status(201).json(new ApiResponse(201, post, 'Post created successfully'));
});