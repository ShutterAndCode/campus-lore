import { z } from "zod";

export const createReportBodySchema = z
  .object({
    reason: z.enum([
      "spam",
      "harassment",
      "inappropriate_content",
      "misinformation",
      "other",
    ]),
    description: z.string().trim().max(500).optional(),
  })
  .strict();
  
export const getReportsQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(20),
    status: z.enum(["pending", "reviewed", "dismissed"]).default("pending"),
  })
  .strict();

export const updateReportStatusBodySchema = z
  .object({
    status: z.enum(["reviewed", "dismissed"]),
  })
  .strict();
