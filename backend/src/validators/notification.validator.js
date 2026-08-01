import { z } from 'zod';
import { Types } from 'mongoose';

export const notificationIdParamsSchema = z
  .object({
    notificationId: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid notificationId format',
    }),
  })
  .strict();

export const getNotificationsQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(20), //read bout coearce
  })
  .strict();