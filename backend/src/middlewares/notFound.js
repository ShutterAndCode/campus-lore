const ApiError = require('../utils/ApiError');

/**
 * Catches any request that didn't match a defined route
 * and forwards a standardized 404 error to the error handler.
 */
const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found - ${req.originalUrl}`));
};

module.exports = notFound;
