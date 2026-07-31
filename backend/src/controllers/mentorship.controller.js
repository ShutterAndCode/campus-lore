import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { createMentorshipRequest } from '../services/mentorship.service.js';

export const createMentorshipRequestController = asyncHandler(async (req, res) => {
  const { receiver, message } = req.body;
  const request = await createMentorshipRequest(req.user._id, receiver, message);
  res.status(201).json(new ApiResponse(201, request, 'Mentorship request sent successfully'));
});