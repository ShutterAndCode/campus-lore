import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { sendMessage, getConversationMessages } from '../services/message.service.js';

export const sendMessageController = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;
  const { content } = req.body;
  const message = await sendMessage(conversationId, req.user._id, content);
  res.status(201).json(new ApiResponse(201, message, 'Message sent successfully'));
});

export const getConversationMessagesController = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;
  const messages = await getConversationMessages(conversationId, req.user._id);
  res.status(200).json(new ApiResponse(200, messages, 'Messages fetched successfully'));
});