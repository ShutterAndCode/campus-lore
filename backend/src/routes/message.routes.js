import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

import { messageIdParamsSchema } from "../validators/common.validator.js";

import { markMessageAsReadController } from "../controllers/message.controller.js";

const router = Router();

router.patch(
  "/:messageId/read",
  authenticate,
  validate(messageIdParamsSchema, "params"),
  markMessageAsReadController,
);

export default router;
