import Message from '../models/message.model.js';
import Conversation from '../models/conversation.model.js';
import ApiError from '../utils/ApiError.js';

const verifyParticipant = (conversation, userId) => {
  const isParticipant = conversation.participants.some(
    (p) => p.toString() === userId.toString()
  );
  if (!isParticipant) {
    throw new ApiError(403, 'You are not a participant in this conversation');
  }
};

export const sendMessage = async (conversationId, senderId, content) => {
  const conversation = await Conversation.findById(conversationId);

  if (!conversation) {
    throw new ApiError(404, 'Conversation not found');
  }

  verifyParticipant(conversation, senderId);

  const message = await Message.create({
    conversation: conversationId,
    sender: senderId,
    content,
  });

  conversation.lastMessage = message._id;
  await conversation.save();

  return message;
};

export const getConversationMessages = async (conversationId, userId) => {
  const conversation = await Conversation.findById(conversationId);

  if (!conversation) {
    throw new ApiError(404, 'Conversation not found');
  }

  verifyParticipant(conversation, userId);

  const messages = await Message.find({ conversation: conversationId }).sort({ createdAt: 1 });

  return messages;
};