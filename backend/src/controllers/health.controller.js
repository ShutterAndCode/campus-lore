import mongoose from "mongoose";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const DB_STATES = {
  0: "disconnected",
  1: "connected",
  2: "connecting",
  3: "disconnecting",
};

/**
 * GET /api/v1/health
 * Reports basic service liveness and current DB connection state.
 */
export const getHealth = asyncHandler(async (req, res) => {
  const payload = {
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: DB_STATES[mongoose.connection.readyState] ?? "unknown",
  };

  return res
    .status(200)
    .json(new ApiResponse(200, payload, "Service is healthy"));
});