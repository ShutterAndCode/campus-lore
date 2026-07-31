import ApiError from "../utils/ApiError.js";

/**
 * Catches any request that didn't match a defined route
 * and forwards a standardized 404 error to the error handler.
 */
const notFound = (req, res, next) => {
  return next(new ApiError(404, `Route not found - ${req.originalUrl}`));
};

export default notFound;