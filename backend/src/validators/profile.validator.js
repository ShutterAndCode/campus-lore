import { z } from 'zod';
import { Types } from 'mongoose';

export const updateProfileSchema = z.object({
  name: z.string().trim().min(1).optional(),
  avatar: z.string().url().optional(),
  bio: z.string().max(500).optional(),
  branch: z.string().trim().min(1).optional(),
  batch: z.string().trim().min(1).optional(),
  graduationYear: z
    .number()
    .int()
    .min(2000)
    .max(new Date().getFullYear() + 6)
    .optional(),
}).strict(false); // Zod's default object behavior is to strip unknown keys silently
///.strict(false) only to make that intent explicit in code

export const getPublicProfileParamsSchema = z
  .object({
    userId: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid userId format',
    }),
  })
  .strict();

  //.refine() - Zod's mechanism for custom validation logic beyond built-in checks like .min()/.max().