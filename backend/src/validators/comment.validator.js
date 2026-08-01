import { z } from "zod";

export const createCommentBodySchema = z
  .object({
    content: z
      .string()
      .trim()
      .min(1, "Comment cannot be empty")
      .max(1000, "Comment too long"),
  })
  .strict();