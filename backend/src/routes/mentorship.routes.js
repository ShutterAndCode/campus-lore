import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createMentorshipRequestSchema,
  requestIdParamsSchema,
  updateRequestStatusSchema,
} from "../validators/mentorship.validator.js";
import {
  createMentorshipRequestController,
  getIncomingRequestsController,
  getOutgoingRequestsController,
  updateRequestStatusController,
} from "../controllers/mentorship.controller.js";

const router = Router();

router.post(
  "/request",
  authenticate,
  validate(createMentorshipRequestSchema),
  createMentorshipRequestController,
);
router.get("/requests/incoming", authenticate, getIncomingRequestsController);
router.get("/requests/outgoing", authenticate, getOutgoingRequestsController);
router.patch(
  "/requests/:requestId",
  authenticate,
  validate(requestIdParamsSchema, "params"),
  validate(updateRequestStatusSchema, "body"),
  updateRequestStatusController,
);

export default router;
