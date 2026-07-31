import MentorshipRequest from '../models/mentorshipRequest.model.js';
import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';

export const createMentorshipRequest = async (senderId, receiverId, message) => {
  if (senderId.toString() === receiverId) {
    throw new ApiError(400, 'You cannot send a mentorship request to yourself');
  }

  const receiverExists = await User.exists({ _id: receiverId });
  if (!receiverExists) {
    throw new ApiError(404, 'Receiver not found');
  }

  const existingPending = await MentorshipRequest.findOne({
    sender: senderId,
    receiver: receiverId,
    status: 'pending',
  });
  if (existingPending) {
    throw new ApiError(409, 'A pending mentorship request already exists');
  }

  const request = await MentorshipRequest.create({
    sender: senderId,
    receiver: receiverId,
    message,
  });

  return request;
};