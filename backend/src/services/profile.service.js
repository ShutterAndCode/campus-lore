import User from '../models/user.model.js';
import  ApiError from '../utils/ApiError.js';

const EDITABLE_FIELDS = ['name', 'avatar', 'bio', 'branch', 'batch', 'graduationYear'];
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const getProfile = async (userId) => {
  const user = await User.findById(userId).select('-refreshToken');
  if (!user) throw new ApiError(404, 'User not found');
  return user;
};

export const updateProfile = async (userId, updates) => {
  const sanitizedUpdates = {};
  for (const field of EDITABLE_FIELDS) {
    if (updates[field] !== undefined) {
      sanitizedUpdates[field] = updates[field];
    }
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { $set: sanitizedUpdates },
    { new: true, runValidators: true }
  ).select('-refreshToken');

  if (!user) throw new ApiError(404, 'User not found');
  return user;
};
const PUBLIC_PROFILE_FIELDS = 'name avatar bio branch batch graduationYear';
//Mongoose only returns these fields plus _id. email, googleId, role, refreshToken, organization are never fetched from Mongo at all,

export const getPublicProfile = async (userId) => {
  const user = await User.findById(userId).select(PUBLIC_PROFILE_FIELDS);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return user;
};

export const searchUsersByName = async (searchTerm, currentUserId) => {
  const safeTerm = escapeRegex(searchTerm);

  const users = await User.find({
    name: { $regex: safeTerm, $options: 'i' },
    _id: { $ne: currentUserId },
  }).select(PUBLIC_PROFILE_FIELDS);

  return users;
};
//"a.*", it's treated as the literal string "a.*", not a wildcard pattern). This directly addresses the ReDoS/injection concern