import { z } from 'zod';
import { Types } from 'mongoose';

export const requestIdParamsSchema = z
  .object({
    requestId: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid requestId format',
    }),
  })
  .strict();

export const conversationIdParamsSchema = z
  .object({
    conversationId: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid conversationId format',
    }),
  })
  .strict();