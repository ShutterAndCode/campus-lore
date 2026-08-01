import { z } from "zod";
import { Types } from "mongoose";

export const sendMessageBodySchema = z
  .object({
    content: z
      .string()
      .trim()
      .min(1, "Message content cannot be empty")
      .max(2000, "Message too long"),
  })
  .strict();

  export const messageIdParamsSchema = z
  .object({
    messageId: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid messageId format',
    }),
  })
  .strict();