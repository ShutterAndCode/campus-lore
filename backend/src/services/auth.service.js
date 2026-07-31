import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

/**
 * Finds an existing Google user or creates a new one.
 */
export const findOrCreateGoogleUser = async (profile) => {
  if (!profile?.id || !profile?.emails?.length) {
    throw new ApiError(400, "Invalid Google profile received");
  }

  const email = profile.emails[0].value;
  const avatar = profile.photos?.[0]?.value ?? "";
  const organization = email.split("@")[1];

  let user = await User.findOne({ googleId: profile.id });

  if (user) {
    user.name = profile.displayName;
    user.avatar = avatar;

    await user.save();

    return user;
  }

  user = await User.findOne({ email });

  if (user) {
    user.googleId = profile.id;
    user.name = profile.displayName;
    user.avatar = avatar;

    await user.save();

    return user;
  }

  return User.create({
    googleId: profile.id,
    name: profile.displayName,
    email,
    avatar,
    organization,
  });
};

/**
 * Generates access and refresh tokens for a user.
 */
export const generateAuthTokens = async (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  return {
    accessToken,
    refreshToken,
  };
};

/**
 * Validates a refresh token and returns its associated user.
 * Internal helper used by auth services.
 */
const getUserFromRefreshToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new ApiError(401, "No refresh token provided");
  }

  const payload = verifyRefreshToken(refreshToken);

  const user = await User.findById(payload.id).select("+refreshToken");

  if (!user) {
    throw new ApiError(401, "User not found");
  }

  if (user.refreshToken !== refreshToken) {
    throw new ApiError(401, "Invalid refresh token");
  }

  return user;
};

/**
 * Generates a new access token using a valid refresh token.
 */
export const refreshAccessToken = async (refreshToken) => {
  const user = await getUserFromRefreshToken(refreshToken);

  return generateAccessToken(user);
};

/**
 * Revokes the current refresh token.
 */
export const logoutUser = async (refreshToken) => {
  const user = await getUserFromRefreshToken(refreshToken);

  user.refreshToken = null;
  await user.save();
};