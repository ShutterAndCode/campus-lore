import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { getProfile, updateProfile,getPublicProfile,searchUsersByName } from "../services/profile.service.js";

export const getMyProfile = asyncHandler(async (req, res) => {
  const profile = await getProfile(req.user._id);
  res
    .status(200)
    .json(new ApiResponse(200, profile, "Profile fetched successfully"));
});

export const updateMyProfile = asyncHandler(async (req, res) => {
  const updatedProfile = await updateProfile(req.user._id, req.body);
  res
    .status(200)
    .json(new ApiResponse(200, updatedProfile, "Profile updated successfully"));
});

export const getPublicProfileController = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const profile = await getPublicProfile(userId);
  res
    .status(200)
    .json(new ApiResponse(200, profile, "Public profile fetched successfully"));
});

export const searchUsersController = asyncHandler(async (req, res) => {
  const { name } = req.query;
  const users = await searchUsersByName(name, req.user._id);
  res.status(200).json(new ApiResponse(200, users, 'Search results fetched successfully'));
});