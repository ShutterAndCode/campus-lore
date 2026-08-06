import { z } from "zod";

export const storySchema = z.object({

  title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters")
    .max(150, "Title must be under 150 characters"),


  content: z
    .string()
    .trim()
    .min(50, "Story should be at least 50 characters"),


  tags: z
    .array(z.string())
    .min(1, "Add at least one tag"),


  branch: z
    .string()
    .min(2, "Branch is required"),


  year: z.enum(
  ["1st", "2nd", "3rd", "4th"],
  {
    errorMap: () => ({
      message: "Please select an academic year",
    }),
  }
),


  anonymous: z.boolean(),
});