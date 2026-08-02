import express from "express";
import { getHealth } from "../controllers/health.controller.js";

const router = express.Router();


/**
 * @swagger
 * /health:
 *   get:
 *     tags: [Health]
 *     summary: Check API health status
 *     security: []
 *     responses:
 *       200:
 *         description: API is running
 */
router.get("/", getHealth);

export default router;