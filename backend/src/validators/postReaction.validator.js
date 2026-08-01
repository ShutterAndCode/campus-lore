import { z } from 'zod';
import { Types } from 'mongoose';

export const postIdParamsSchema = z
  .object({
    postId: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid postId format',
    }),
  })
  .strict();

export const createReactionBodySchema = z
  .object({
    reactionType: z.enum(['like']), // mongoose andzod schemas are diff, we can add other reaction here later
  })
  .strict();