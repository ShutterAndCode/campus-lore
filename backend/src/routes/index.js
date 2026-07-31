import { Router } from "express";
import healthRoutes from "./health.routes.js";
import authRoutes from "./auth.routes.js";
import profileRoutes from "./profile.routes.js";
import mentorshipRoutes from "./mentorship.routes.js";
import { getMentorsController, getMenteesController } from '../controllers/mentorship.controller.js';
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/mentorship", mentorshipRoutes);
router.get('/mentors', authenticate, getMentorsController);
router.get('/mentees', authenticate, getMenteesController);
export default router;
