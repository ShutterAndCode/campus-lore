import { z } from "zod";
import { Types } from "mongoose";
import { objectIdParamsSchema } from './common.validator.js';
export const sendMessageBodySchema = z
  .object({
    content: z
      .string()
      .trim()
      .min(1, "Message content cannot be empty")
      .max(2000, "Message too long"),
  })
  .strict();

  export const messageIdParamsSchema = objectIdParamsSchema('messageId')