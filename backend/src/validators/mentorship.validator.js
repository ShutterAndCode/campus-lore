import { z } from "zod";
import { Types } from "mongoose";

export const createMentorshipRequestSchema = z
  .object({
    receiver: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: "Invalid receiver ID format",
    }),
    message: z.string().trim().max(500).optional(),
  })
  .strict();

export const updateRequestStatusSchema = z
  .object({
    status: z.enum(["accepted", "rejected"]),
  })
  .strict();