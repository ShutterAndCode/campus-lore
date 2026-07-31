import { Router } from "express";
import healthRoutes from "./health.routes.js";
import authRoutes from "./auth.routes.js";
import profileRoutes from "./profile.routes.js";
import mentorshipRoutes from "./mentorship.routes.js";
import {
  getMentorsController,
  getMenteesController,
  cancelMentorshipRequestController,
} from "../controllers/mentorship.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  requestIdParamsSchema,
} from "../validators/mentorship.validator.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);

router.use("/mentorship", mentorshipRoutes);
router.patch(
  "/requests/:requestId/cancel",
  authenticate,
  validate(requestIdParamsSchema, "params"),
  cancelMentorshipRequestController,
);
router.get("/mentors", authenticate, getMentorsController);
router.get("/mentees", authenticate, getMenteesController);
export default router;
