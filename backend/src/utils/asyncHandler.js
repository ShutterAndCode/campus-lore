/**
 * Wraps an async controller or middleware and forwards rejected
 * promises to Express's centralized error handler.
 *
 * @param {Function} requestHandler
 * @returns {Function}
 */
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    return Promise.resolve(requestHandler(req, res, next)).catch(next);
  };
};

export default asyncHandler;