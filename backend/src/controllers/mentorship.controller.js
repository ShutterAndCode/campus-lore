import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { createMentorshipRequest,updateRequestStatus } from '../services/mentorship.service.js';

export const createMentorshipRequestController = asyncHandler(async (req, res) => {
  const { receiver, message } = req.body;
  const request = await createMentorshipRequest(req.user._id, receiver, message);
  res.status(201).json(new ApiResponse(201, request, 'Mentorship request sent successfully'));
});

export const getIncomingRequestsController = asyncHandler(async (req, res) => {
  const requests = await getIncomingRequests(req.user._id);
  res.status(200).json(new ApiResponse(200, requests, 'Incoming requests fetched successfully'));
});

export const getOutgoingRequestsController = asyncHandler(async (req, res) => {
  const requests = await getOutgoingRequests(req.user._id);
  res.status(200).json(new ApiResponse(200, requests, 'Outgoing requests fetched successfully'));
});

export const updateRequestStatusController = asyncHandler(async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body;
  const updatedRequest = await updateRequestStatus(requestId, req.user._id, status);
  res.status(200).json(new ApiResponse(200, updatedRequest, 'Request status updated successfully'));
});

export const cancelMentorshipRequestController = asyncHandler(async (req, res) => {
  const { requestId } = req.params;
  const cancelledRequest = await cancelMentorshipRequest(requestId, req.user._id);
  res.status(200).json(new ApiResponse(200, cancelledRequest, 'Mentorship request cancelled successfully'));
});

export const getMentorsController = asyncHandler(async (req, res) => {
  const mentors = await getMentors(req.user._id);
  res.status(200).json(new ApiResponse(200, mentors, 'Mentors fetched successfully'));
});

export const getMenteesController = asyncHandler(async (req, res) => {
  const mentees = await getMentees(req.user._id);
  res.status(200).json(new ApiResponse(200, mentees, 'Mentees fetched successfully'));
});