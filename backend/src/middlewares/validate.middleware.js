import ApiError from "../utils/ApiError.js";
import asyncHandler from '../utils/asyncHandler.js';

export const validate = (schema, source = "body") =>
  asyncHandler(async (req, res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      const message = result.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join(", ");

      throw new ApiError(400, message);
    }

    req[source] = result.data;
    next();
  });
  //After Zod parses successfully, the validated (and potentially transformed) data replaces the original request data, so downstream code always receives trusted input: