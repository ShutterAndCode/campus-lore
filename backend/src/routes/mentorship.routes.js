import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

import {
  createMentorshipRequestSchema,
  updateRequestStatusSchema,
} from "../validators/mentorship.validator.js";

import { requestIdParamsSchema } from "../validators/common.validator.js";

import {
  createMentorshipRequestController,
  getIncomingRequestsController,
  getOutgoingRequestsController,
  updateRequestStatusController,
  getMentorsController,
  getMenteesController,
  cancelMentorshipRequestController,
} from "../controllers/mentorship.controller.js";

const router = Router();

router.post(
  "/request",
  authenticate,
  validate(createMentorshipRequestSchema),
  createMentorshipRequestController
);

router.get(
  "/requests/incoming",
  authenticate,
  getIncomingRequestsController
);

router.get(
  "/requests/outgoing",
  authenticate,
  getOutgoingRequestsController
);

router.patch(
  "/requests/:requestId",
  authenticate,
  validate(requestIdParamsSchema, "params"),
  validate(updateRequestStatusSchema, "body"),
  updateRequestStatusController
);

router.patch(
  "/requests/:requestId/cancel",
  authenticate,
  validate(requestIdParamsSchema, "params"),
  cancelMentorshipRequestController
);

router.get("/mentors", authenticate, getMentorsController);

router.get("/mentees", authenticate, getMenteesController);

export default router;