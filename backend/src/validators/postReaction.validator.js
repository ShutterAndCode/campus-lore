import { z } from "zod";
import { Types } from "mongoose";
import { objectIdParamsSchema } from "./common.validator.js";
export const postIdParamsSchema = objectIdParamsSchema("postId");
export const createReactionBodySchema = z
  .object({
    reactionType: z.enum(["like"]), // mongoose andzod schemas are diff, we can add other reaction here later
  })
  .strict();
