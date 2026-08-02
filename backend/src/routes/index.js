import { Router } from "express";

import {authLimiter} from "../middlewares/rateLimit.middleware.js"

import healthRoutes from "./health.routes.js";
import authRoutes from "./auth.routes.js";
import profileRoutes from "./profile.routes.js";
import mentorshipRoutes from "./mentorship.routes.js";
import conversationRoutes from "./conversation.routes.js";
import messageRoutes from "./message.routes.js";
import notificationRoutes from "./notification.routes.js";
import postRoutes from "./post.routes.js";
import reportRoutes from './report.routes.js';


const router = Router();



router.use("/health", healthRoutes);
router.use("/auth",authLimiter, authRoutes);
router.use("/profile", profileRoutes);
router.use("/mentorship", mentorshipRoutes);
router.use("/conversations", conversationRoutes);
router.use("/messages", messageRoutes);
router.use("/notifications", notificationRoutes);
router.use("/posts", postRoutes);
router.use('/reports', reportRoutes);

export default router;