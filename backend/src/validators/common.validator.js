import { z } from "zod";
import { Types } from "mongoose";

export const objectIdParamsSchema = (paramName) =>
  z
    .object({
      [paramName]: z.string().refine((val) => Types.ObjectId.isValid(val), {
        message: `Invalid ${paramName} format`,
      }),
    })
    .strict();

export const postIdParamsSchema = objectIdParamsSchema("postId");
export const commentIdParamsSchema = objectIdParamsSchema("commentId");
export const conversationIdParamsSchema =
  objectIdParamsSchema("conversationId");
export const requestIdParamsSchema = objectIdParamsSchema("requestId");
export const notificationIdParamsSchema =
  objectIdParamsSchema("notificationId");
export const messageIdParamsSchema = objectIdParamsSchema("messageId");
export const userIdParamsSchema = objectIdParamsSchema("userId");