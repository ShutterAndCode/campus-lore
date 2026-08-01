import { z } from 'zod';
import { Types } from 'mongoose';
import { objectIdParamsSchema } from './common.validator.js';
import {
  requestIdParamsSchema,
  conversationIdParamsSchema,
} from "./common.validator.js";
export const requestIdParamsSchema = z
  .object({
    requestId: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid requestId format',
    }),
  })
  .strict();

export const conversationIdParamsSchema = objectIdParamsSchema('conversationId')
//// No conversation-specific body/query validators yet.
// Conversation/request parameter validators are centralized in common.validator.js.