import { z } from "zod";

export const storySchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters.")
    .max(120, "Title cannot exceed 120 characters."),

  content: z
  .string()
  .trim()
  .min(50, "Story should be at least 50 characters.")
  .max(5000, "Story cannot exceed 5000 characters."),

  tags: z.array(z.string()).min(1, "Add at least one tag"),

  branch: z
  .string()
  .min(1, "Please select your branch."),

  year: z.enum(["1st", "2nd", "3rd", "4th"], {
    errorMap: () => ({
      message: "Please select your academic year",
    }),
  }),

  anonymous: z.boolean(),
});
