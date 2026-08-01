import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { toggleReaction } from '../services/postReaction.service.js';

export const toggleReactionController = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { reactionType } = req.body;
  const result = await toggleReaction(postId, req.user._id, reactionType);
  res.status(200).json(new ApiResponse(200, result, 'Reaction updated successfully'));
});