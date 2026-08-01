//routes
import { Router } from "express";
import healthRoutes from "./health.routes.js";
import authRoutes from "./auth.routes.js";
import profileRoutes from "./profile.routes.js";
import mentorshipRoutes from "./mentorship.routes.js";
import conversationRoutes from './conversation.routes.js';
import messageRoutes from './message.routes.js';
import notificationRoutes from './notification.routes.js';
import postRoutes from './post.routes.js';

//controllers
import {
  getMentorsController,
  getMenteesController,
  cancelMentorshipRequestController,
} from "../controllers/mentorship.controller.js";

//middlewares
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

//validators
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
router.use('/conversations', conversationRoutes);
router.use('/messages', messageRoutes);
router.use('/notifications', notificationRoutes);
router.use('/posts', postRoutes);
export default router;
