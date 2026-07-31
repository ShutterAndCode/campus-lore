import env from "../config/env.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  generateAuthTokens,
  refreshAccessToken,
  logoutUser,
} from "../services/auth.service.js";

/**
 * Handles successful Google OAuth authentication.
 */
export const googleCallback = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Authentication failed");
  }

  const { accessToken, refreshToken } = await generateAuthTokens(req.user);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  const redirectUrl = `${env.FRONTEND_OAUTH_SUCCESS_URL}#accessToken=${accessToken}`;

  return res.redirect(redirectUrl);
});

/**
 * Returns the authenticated user's profile.
 */
export const getMe = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

/**
 * Issues a new access token using a valid refresh token.
 */
export const refresh = asyncHandler(async (req, res) => {
  const accessToken = await refreshAccessToken(req.cookies.refreshToken);

  return res
    .status(200)
    .json(new ApiResponse(200, { accessToken }, "Access token refreshed"));
});

/**
 * Logs the user out by revoking the refresh token
 * and clearing the refresh token cookie.
 */
export const logout = asyncHandler(async (req, res) => {
  await logoutUser(req.cookies.refreshToken);

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Logged out successfully"));
});