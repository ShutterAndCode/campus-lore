import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../utils/jwt.js";

export const authenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new ApiError(401, "No access token provided");
  }

  const token = authHeader.split(" ")[1];

  const payload = verifyAccessToken(token);

  const user = await User.findById(payload.id);

  if (!user) {
    throw new ApiError(401, "User not found");
  }

  req.user = user;

  return next();
});