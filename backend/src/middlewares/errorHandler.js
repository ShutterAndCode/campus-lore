import ApiError from "../utils/ApiError.js";
import env from "../config/env.js";

// eslint-disable-next-line no-unused-vars wtf??
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

  console.error(
    `[error] ${req.method} ${req.originalUrl} -> ${error.statusCode} ${error.message}`
  );

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