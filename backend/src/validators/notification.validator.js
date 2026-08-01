import { z } from "zod";
import { Types } from "mongoose";
import { objectIdParamsSchema } from "./common.validator.js";

export const notificationIdParamsSchema =
  objectIdParamsSchema("notificationId");
export const getNotificationsQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(20), //read bout coearce
  })
  .strict();
