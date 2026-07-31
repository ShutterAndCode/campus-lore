import MentorshipRequest from "../models/mentorshipRequest.model.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { PUBLIC_PROFILE_FIELDS } from './profile.service.js';


export const createMentorshipRequest = async (
  senderId,
  receiverId,
  message,
) => {
  if (senderId.toString() === receiverId) {
    throw new ApiError(400, "You cannot send a mentorship request to yourself");
  }

  const receiverExists = await User.exists({ _id: receiverId });
  if (!receiverExists) {
    throw new ApiError(404, "Receiver not found");
  }

  const existingPending = await MentorshipRequest.findOne({
    sender: senderId,
    receiver: receiverId,
    status: "pending",
  });
  if (existingPending) {
    throw new ApiError(409, "A pending mentorship request already exists");
  }

  const request = await MentorshipRequest.create({
    sender: senderId,
    receiver: receiverId,
    message,
  });

  return request;
};

export const getIncomingRequests = async (userId) => {
  const requests = await MentorshipRequest.find({
    receiver: userId,
    status: "pending",
  })
    .populate("sender", PUBLIC_PROFILE_FIELDS)
    .sort({ createdAt: -1 });

  return requests;
};

export const getOutgoingRequests = async (userId) => {
  const requests = await MentorshipRequest.find({ sender: userId })
    .populate("receiver", PUBLIC_PROFILE_FIELDS)
    .sort({ createdAt: -1 });

  return requests;
};

export const updateRequestStatus = async (requestId, userId, newStatus) => {
  const request = await MentorshipRequest.findById(requestId);

  if (!request) {
    throw new ApiError(404, "Mentorship request not found");
  }

  if (request.receiver.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to update this request");
  }

  if (request.status !== "pending") {
    throw new ApiError(409, "This request has already been processed");
  }

  request.status = newStatus;
  await request.save();

  return request;
};
