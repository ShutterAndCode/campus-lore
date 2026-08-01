import MentorshipRequest from "../models/mentorshipRequest.model.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { PUBLIC_PROFILE_FIELDS } from "./profile.service.js";
import { createNotification } from "./notification.service.js";

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
  await createNotification({
    recipient: request.receiver,
    sender: request.sender,
    type: "mentorship_request_received",
    title: "New Mentorship Request",
    message: "You have received a new mentorship request.",
    relatedResource: request._id,
  }).catch((err) => console.error("Notification creation failed:", err));

  return request;

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
  const notificationType =
    newStatus === "accepted"
      ? "mentorship_request_accepted"
      : "mentorship_request_rejected";

  await createNotification({
    recipient: request.sender,
    sender: request.receiver,
    type: notificationType,
    title: newStatus === "accepted" ? "Request Accepted" : "Request Rejected",
    message: `Your mentorship request has been ${newStatus}.`,
    relatedResource: request._id,
  }).catch((err) => console.error("Notification creation failed:", err));

  return request;

  return request;
};

export const cancelMentorshipRequest = async (requestId, userId) => {
  const request = await MentorshipRequest.findById(requestId);

  if (!request) {
    throw new ApiError(404, "Mentorship request not found");
  }

  if (request.sender.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to cancel this request");
  }

  if (request.status !== "pending") {
    throw new ApiError(409, "Only pending requests can be cancelled");
  }

  request.status = "cancelled";
  await request.save();
  await createNotification({
    recipient: request.receiver,
    sender: request.sender,
    type: 'mentorship_request_cancelled',
    title: 'Request Cancelled',
    message: 'A mentorship request sent to you has been cancelled.',
    relatedResource: request._id,
  }).catch((err) => console.error('Notification creation failed:', err));

  return request;

  return request;
};

export const getMentors = async (userId) => {
  const requests = await MentorshipRequest.find({
    receiver: userId,
    status: "accepted",
  })
    .populate("sender", PUBLIC_PROFILE_FIELDS)
    .sort({ updatedAt: -1 });

  return requests.map((r) => r.sender);
};

export const getMentees = async (userId) => {
  const requests = await MentorshipRequest.find({
    sender: userId,
    status: "accepted",
  })
    .populate("receiver", PUBLIC_PROFILE_FIELDS)
    .sort({ updatedAt: -1 });

  return requests.map((r) => r.receiver);
};
