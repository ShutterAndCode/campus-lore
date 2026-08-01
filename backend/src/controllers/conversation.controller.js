import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import {
  createConversation,
  getConversationById,
  getUserConversations,
} from '../services/conversation.service.js';

export const createConversationController = asyncHandler(async (req, res) => {
  const { requestId } = req.params;
  const conversation = await createConversation(requestId);
  res.status(201).json(new ApiResponse(201, conversation, 'Conversation ready'));
});

export const getConversationsController = asyncHandler(async (req, res) => {
  const conversations = await getUserConversations(req.user._id);
  res.status(200).json(new ApiResponse(200, conversations, 'Conversations fetched successfully'));
});

export const getConversationByIdController = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;
  const conversation = await getConversationById(conversationId, req.user._id);
  res.status(200).json(new ApiResponse(200, conversation, 'Conversation fetched successfully'));
});