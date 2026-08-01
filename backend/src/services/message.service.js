import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import ApiError from "../utils/ApiError.js";
import { createNotification } from "./notification.service.js";

const verifyParticipant = (conversation, userId) => {
  const isParticipant = conversation.participants.some(
    (p) => p.toString() === userId.toString(),
  );
  if (!isParticipant) {
    throw new ApiError(403, "You are not a participant in this conversation");
  }
};

export const sendMessage = async (conversationId, senderId, content) => {
  const conversation = await Conversation.findById(conversationId);

  if (!conversation) {
    throw new ApiError(404, "Conversation not found");
  }

  verifyParticipant(conversation, senderId);

  const message = await Message.create({
    conversation: conversationId,
    sender: senderId,
    content,
  });

  conversation.lastMessage = message._id;
  await conversation.save();
  const recipientId = conversation.participants.find(
    (p) => p.toString() !== senderId.toString()
  );

  await createNotification({
    recipient: recipientId,
    sender: senderId,
    type: 'new_message',
    title: 'New Message',
    message: 'You have received a new message.',
    relatedResource: conversation._id,// this willtake them t0 the message if they click onit
  }).catch((err) => console.error('Notification creation failed:', err));

  return message;

  return message;
};

export const getConversationMessages = async (conversationId, userId) => {
  const conversation = await Conversation.findById(conversationId);

  if (!conversation) {
    throw new ApiError(404, "Conversation not found");
  }

  verifyParticipant(conversation, userId);

  const messages = await Message.find({ conversation: conversationId }).sort({
    createdAt: 1,
  });

  return messages;
};

export const markMessageAsRead = async (messageId, userId) => {
  const message = await Message.findById(messageId);

  if (!message) {
    throw new ApiError(404, "Message not found");
  }

  const conversation = await Conversation.findById(message.conversation);

  if (!conversation) {
    throw new ApiError(404, "Conversation not found");
  }

  verifyParticipant(conversation, userId);

  if (message.sender.toString() === userId.toString()) {
    throw new ApiError(403, "You cannot mark your own message as read");
  }

  if (message.isRead) {
    return message;
  }

  message.isRead = true;
  await message.save();

  return message;
};

export const getUnreadMessageCount = async (userId) => {
  const conversations = await Conversation.find({
    participants: userId,
  }).select("_id");
  const conversationIds = conversations.map((c) => c._id);

  const unreadCount = await Message.countDocuments({
    conversation: { $in: conversationIds },
    sender: { $ne: userId },
    isRead: false,
  });

  return unreadCount;
};
