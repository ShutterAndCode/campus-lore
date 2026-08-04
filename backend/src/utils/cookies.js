import env from "../config/env.js";

const isProduction = env.NODE_ENV === "production";

const baseCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax",
};

const ACCESS_TOKEN_MAX_AGE = 15 * 60 * 1000; // 15 minutes
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

export function setAccessTokenCookie(res, token) {
  res.cookie("accessToken", token, {
    ...baseCookieOptions,
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });
}

export function setRefreshTokenCookie(res, token) {
  res.cookie("refreshToken", token, {
    ...baseCookieOptions,
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });
}

export function clearAuthCookies(res) {
  res.clearCookie("accessToken", baseCookieOptions);

  res.clearCookie("refreshToken", baseCookieOptions);
}