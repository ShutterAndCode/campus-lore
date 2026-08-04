import { z } from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  bio: z
    .string()
    .trim()
    .max(300, "Bio must be under 300 characters")
    .optional()
    .or(z.literal("")),
});