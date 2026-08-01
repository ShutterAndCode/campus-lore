import Conversation from '../models/conversation.model.js';
import MentorshipRequest from '../models/mentorshipRequest.model.js';
import ApiError from '../utils/ApiError.js';


///the unique index would reject the second create, though handling that specific race gracefully with a try/catch is arguably beyond this milestone's explicit scope; flagging it as a known edge case rather than solving it now).


export const createConversation = async (requestId) => {
  const request = await MentorshipRequest.findById(requestId);

  if (!request) {
    throw new ApiError(404, 'Mentorship request not found');
  }

  if (request.status !== 'accepted') {
    throw new ApiError(409, 'Conversation can only be created for an accepted mentorship request');
  }

  const existing = await Conversation.findOne({ mentorshipRequest: requestId });
  if (existing) {
    return existing;
  }

  const conversation = await Conversation.create({
    participants: [request.sender, request.receiver],
    mentorshipRequest: requestId,
  });

  return conversation;
};

export const getConversationById = async (conversationId, userId) => {
  const conversation = await Conversation.findById(conversationId);

  if (!conversation) {
    throw new ApiError(404, 'Conversation not found');
  }

  const isParticipant = conversation.participants.some(//read bout .some
    (p) => p.toString() === userId.toString()
  );
  if (!isParticipant) {
    throw new ApiError(403, 'You are not a participant in this conversation');
  }

  return conversation;
};

export const getUserConversations = async (userId) => {
  const conversations = await Conversation.find({ participants: userId }).sort({
    updatedAt: -1,
  });

  return conversations;
};