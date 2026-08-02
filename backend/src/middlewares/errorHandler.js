import ApiError from "../utils/ApiError.js";
import env from "../config/env.js";
import { logger } from "../config/logger.js";

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const error =
    err instanceof ApiError
      ? err
      : new ApiError(
          err.statusCode || 500,
          err.message || "Internal Server Error",
          [],
          err.stack
        );

  const logMessage = `${req.method} ${req.originalUrl} -> ${error.statusCode} ${error.message}`;

  if (err instanceof ApiError) {
    logger.warn(logMessage);
  } else {
    logger.error(logMessage, { stack: error.stack });
  }

  return res.status(error.statusCode).json({
    success: false,
    statusCode: error.statusCode,
    message: error.message,
    errors: error.errors,
    ...(env.NODE_ENV === "development" && {
      stack: error.stack,
    }),
  });
};

export default errorHandler;