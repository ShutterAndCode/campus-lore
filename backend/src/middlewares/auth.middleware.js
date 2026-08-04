import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../utils/jwt.js";

export const authenticate = asyncHandler(async (req, res, next) => {
  let token = req.cookies?.accessToken;

  // Fallback for API clients (Postman, mobile apps, etc.)
  if (!token) {
    const authHeader = req.headers.authorization;

    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }

  if (!token) {
    throw new ApiError(401, "Authentication required");
  }

  const payload = verifyAccessToken(token);

  const user = await User.findById(payload.id);

  if (!user) {
    throw new ApiError(401, "User not found");
  }

  req.user = user;

  next();
});