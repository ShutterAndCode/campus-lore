/**
 * Wraps an async route/middleware handler and forwards any
 * rejected promise to Express's error handling via next(err),
 * avoiding repetitive try/catch blocks in every controller.
 *
 * @param {Function} requestHandler
 * @returns {Function}
 */
const asyncHandler = (requestHandler) => (req, res, next) => {
  Promise.resolve(requestHandler(req, res, next)).catch(next);
};

module.exports = asyncHandler;
