import { z } from "zod";

export const updateProfileSchema = z
  .object({
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
  })
  .strict(false);

export const searchUsersQuerySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Search query cannot be empty")
      .max(50, "Search query too long"),
  })
  .strict();