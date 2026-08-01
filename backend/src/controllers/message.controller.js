import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  sendMessage,
  getConversationMessages,
  markMessageAsRead,
  getUnreadMessageCount,
} from "../services/message.service.js";
import { getIO } from "../socket/socket.js";

export const sendMessageController = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;
  const { content } = req.body;
  const message = await sendMessage(conversationId, req.user._id, content);

  getIO().to(`conversation:${conversationId}`).emit("message:new", {
    message,
    conversationId,
  });

  res
    .status(201)
    .json(new ApiResponse(201, message, "Message sent successfully"));
});
export const getConversationMessagesController = asyncHandler(
  async (req, res) => {
    const { conversationId } = req.params;
    const messages = await getConversationMessages(
      conversationId,
      req.user._id,
    );
    res
      .status(200)
      .json(new ApiResponse(200, messages, "Messages fetched successfully"));
  },
);

export const markMessageAsReadController = asyncHandler(async (req, res) => {
  const { messageId } = req.params;
  const message = await markMessageAsRead(messageId, req.user._id);

  getIO()
    .to(`conversation:${message.conversation.toString()}`)
    .emit("message:read", {
      messageId: message._id,
      conversationId: message.conversation,
    });

  res.status(200).json(new ApiResponse(200, message, "Message marked as read"));
});

export const getUnreadMessageCountController = asyncHandler(
  async (req, res) => {
    const unreadCount = await getUnreadMessageCount(req.user._id);
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { unreadCount },
          "Unread count fetched successfully",
        ),
      );
  },
);
